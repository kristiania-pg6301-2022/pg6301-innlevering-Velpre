export class HttpError extends Error {
    constructor(status, statusText) {
        super("My Custom status text: " + statusText);
        this.status = status;
    }
}

export async function fetchJSON(url){

    const res = await fetch(url)
    if (res.ok){
        return await res.json()
    }
    throw new HttpError(res.status, res.statusText);
}

export async function postJSON(url, answer, id){
    const res = await fetch(url,{
        method:"post",
        body: JSON.stringify({answer,id}),
        headers: {
            "content-type": "application/json",
        },
    });
    return await res.json()
}