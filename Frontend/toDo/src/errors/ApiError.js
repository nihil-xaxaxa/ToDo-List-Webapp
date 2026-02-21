export class ApiError extends Error{
    constructor(status){
        super()
        this.status=status
    }
}