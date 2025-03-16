import { ResponseType } from "../types/ResponseType"

type responseBoxProps = {
    response: ResponseType;
    boxTitle: String;
}

function ResponseBox(props : responseBoxProps){
    const response = props.response?.response;
    
    return (
        <div className="p-4">
            <div className="flex flex-col rounded-md border-solid border-1 border-green-200/75 bg-green-200 space-y-2">
                <div className="flex bg-green-400 w-full px-2">
                    <h1 className="text-l font-semibold">{props.boxTitle}</h1>
                </div>
                <div className="flex px-2 mb-2">
                    {response}
                </div>
            </div>
        </div>
    )
}

export default ResponseBox