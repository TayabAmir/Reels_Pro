"use client"
import { apiClient } from '@/lib/api-client'
import { IVideo } from '@/models/Video'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Home() {
  const [videos, setVideos] = useState<IVideo[]>([])
  const router = useRouter()

  useEffect(() => {
    async function fetchVideos(){
      try {
        const allVideos = await apiClient.getVideos()
        setVideos(allVideos)
      } catch (error) {
        console.log(error)
      }
    }

    fetchVideos()
  }, [])
  
  const handleClick = () => {
    router.push("/upload")
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">ImageKit ReelsPro</h1>
      <button onClick={handleClick}>Click me</button>
      {/* <VideoFeed videos={videos} /> */}
    </main>
  )
}