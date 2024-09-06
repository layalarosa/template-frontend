export function extractErrors(obj: any): string[]{
    const err = obj.error.errors;

    let messageError: string[] = [];

    for (let key in err){
        let field = key;
        const messageField = err[key].map((message: string) => `${field}: ${message}`);
        messageError = messageError.concat(messageField);
    }

    return messageError;
}

export function extractErrorsIdentity(obj: any): string[]{
    let messageError: string[] = [];

    for (let i = 0; i < obj.error.length; i++){
        const element = obj.error[i];
        messageError.push(element.description);
        
    }

    return messageError;
}

