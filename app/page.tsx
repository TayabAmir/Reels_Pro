"use client"
import { apiClient } from '@/lib/api-client'
import { IVideo } from '@/models/Video'
import { IKVideo } from 'imagekitio-next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import VideoCard from './components/VideoCard'

export default function Home() {
  const [videos, setVideos] = useState<IVideo[]>([])
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    async function fetchVideos() {
      try {
        const allVideos = await apiClient.getVideos()
        setVideos(allVideos)
      } catch (error) {
        console.log(error)
      }
    }

    fetchVideos()
  }, [])

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">ImageKit ReelsPro</h1>
      {videos && videos.map((video) => (
        <VideoCard key={video._id?.toString()} video={video}/>
      )
      )}
    </main>
  )
}