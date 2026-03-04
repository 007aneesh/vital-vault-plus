'use client'

import React, { useState, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { patient_management } from '@/configs/patient'
import type { ParseTranscriptResponse } from '@/@types/patient_types'
import { cn } from '@/lib/utils'
import { Mic, Square, Loader2 } from 'lucide-react'

declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition
    webkitSpeechRecognition: typeof SpeechRecognition
  }
}

const SpeechRecognitionAPI =
  typeof window !== 'undefined'
    ? window.SpeechRecognition || window.webkitSpeechRecognition
    : null

export interface ExtractedMedication {
  name: string
  dose: string
  frequency: string
  duration: string
  notes: string
}

interface VoiceInputProps {
  onTranscriptionResult?: (result: {
    transcriptText: string
    medications: ExtractedMedication[]
  }) => void
  onError?: (message: string) => void
  className?: string
  disabled?: boolean
}

export function VoiceInput({
  onTranscriptionResult,
  onError,
  className,
  disabled = false,
}: VoiceInputProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [isParsing, setIsParsing] = useState(false)
  const [transcriptText, setTranscriptText] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const recognitionRef = useRef<InstanceType<NonNullable<typeof SpeechRecognitionAPI>> | null>(null)
  const transcriptChunksRef = useRef<string[]>([])

  const startRecording = useCallback(() => {
    if (!SpeechRecognitionAPI) {
      const msg = 'Speech recognition is not supported in this browser. Try Chrome or Edge.'
      setError(msg)
      onError?.(msg)
      return
    }
    setError(null)
    setTranscriptText(null)
    transcriptChunksRef.current = []

    const recognition = new SpeechRecognitionAPI()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'en-US'

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const results = event.results
      for (let i = event.resultIndex; i < results.length; i++) {
        const result = results[i]
        if (result.isFinal) {
          transcriptChunksRef.current.push(result[0].transcript.trim())
        }
      }
    }

    recognition.onend = () => {
      recognitionRef.current = null
      setIsRecording(false)
      const fullTranscript = transcriptChunksRef.current.filter(Boolean).join(' ').trim()
      if (!fullTranscript) {
        setError('No speech detected. Please try again.')
        onError?.('No speech detected.')
        return
      }
      setTranscriptText(fullTranscript)
      setIsParsing(true)
      setError(null)
      patient_management
        .parseTranscript(fullTranscript)
        .then((res) => {
          const data = (res?.data ?? res) as ParseTranscriptResponse | undefined
          if (!data) {
            const msg = 'Invalid parse response'
            setError(msg)
            onError?.(msg)
            return
          }
          const medications = data.medications ?? []
          onTranscriptionResult?.({
            transcriptText: data.transcript,
            medications: medications.map((m) => ({
              name: m.name ?? '',
              dose: m.dose ?? '',
              frequency: m.frequency ?? '',
              duration: m.duration ?? '',
              notes: m.notes ?? '',
            })),
          })
        })
        .catch((err: unknown) => {
          const message =
            err && typeof err === 'object' && 'message' in err
              ? String((err as { message: unknown }).message)
              : 'Failed to parse transcript'
          setError(message)
          onError?.(message)
        })
        .finally(() => {
          setIsParsing(false)
        })
    }

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      recognitionRef.current = null
      setIsRecording(false)
      setIsParsing(false)
      const msg =
        event.error === 'not-allowed'
          ? 'Microphone access denied.'
          : event.error === 'no-speech'
            ? 'No speech detected. Please try again.'
            : `Speech recognition error: ${event.error}`
      setError(msg)
      onError?.(msg)
    }

    recognitionRef.current = recognition
    recognition.start()
    setIsRecording(true)
  }, [onTranscriptionResult, onError])

  const stopRecording = useCallback(() => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop()
      recognitionRef.current = null
      setIsRecording(false)
    }
  }, [isRecording])

  return (
    <div className={cn('space-y-3', className)}>
      <Label className="text-sm font-medium">Voice input</Label>
      <div className="flex flex-wrap items-center gap-2">
        {!isRecording ? (
          <Button
            type="button"
            variant="outline"
            size="default"
            onClick={startRecording}
            disabled={disabled || isParsing}
          >
            {isParsing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Parsing…
              </>
            ) : (
              <>
                <Mic className="mr-2 h-4 w-4" />
                Start recording
              </>
            )}
          </Button>
        ) : (
          <Button
            type="button"
            variant="destructive"
            size="default"
            onClick={stopRecording}
          >
            <Square className="mr-2 h-4 w-4" />
            Stop recording
          </Button>
        )}
      </div>
      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
      {transcriptText !== null && transcriptText !== '' && (
        <div className="rounded-md border border-input bg-muted/30 p-3">
          <p className="text-xs font-medium text-muted-foreground">
            Transcript
          </p>
          <p className="mt-1 text-sm">{transcriptText}</p>
        </div>
      )}
    </div>
  )
}
