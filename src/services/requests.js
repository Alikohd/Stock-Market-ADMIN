export async function getRequest(url) {
    const res = await fetch(url, {method: 'GET'})
    return await res.json()
}

export function deleteRequest(url) {
    return fetch(url, {
        method: 'DELETE',
    })
}

export function putRequest(url, body) {
    return fetch(url, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
    })
}