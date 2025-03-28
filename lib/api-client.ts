import { IVideo } from "@/models/Video";

export type videoFormData = Omit<IVideo, "_id">

type fetchOptions =  {  
    method? : "GET" | "POST" | "PUT" | "DELETE";
    body? : any;
    headers? : Record<string, string>
}

class APIClient {
    private async Fetch<T>(
        endpoint: string,
        options: fetchOptions = {}, 
    ) : Promise<T> {
        const {method = "GET", body, headers = {}} = options
        const defaultHeaders = {
            "Content-Type": "application/json",
            ...headers
        }

        const res = await fetch(`/api/${endpoint}`, {
            method,
            headers: defaultHeaders,
            body: body ? JSON.stringify(body) : undefined
        })

        if(!res.ok){
            throw new Error(await res.text())
        }
        return res.json()
    }

    async getVideos(){
        return this.Fetch<IVideo[]>("videos")
    }

    async getVideo(id : string){
        return this.Fetch<IVideo>(`videos/${id}`)
    }

    async createVideo(vdData : videoFormData){
        return this.Fetch("videos", {
            method: "POST",
            body: vdData
        })
    }
}

export const apiClient = new APIClient()