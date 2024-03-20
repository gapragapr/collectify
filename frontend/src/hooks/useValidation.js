const useValidation = (value, type) => {
    let isValid = true;

    switch (type) {
        case 'email': 
            isValid = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/.test(value)
            break;
        case 'username': 
            isValid = /^[a-zA-Z0-9]+$/.test(value)
            break;
        case 'userLoginData':
            isValid = /^[A-Za-z0-9.@]+$/.test(value)
            break;
    }

    return isValid
}

export default useValidation