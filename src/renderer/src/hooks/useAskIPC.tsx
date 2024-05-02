export default function useAskIPC()
{
    const ipcRenderer = window.electron.ipcRenderer;

    async function invoke<T>(channel:string, ...args: any):Promise<T>
    {
        const reply = ipcRenderer.invoke(channel, args);
        return reply as Promise<T>;
    }

    function ask(sendChannel:string, ...args: any):void
    {
        ipcRenderer.send(sendChannel, args);
    }    

    return {
        ask,
        invoke
    }
    
}