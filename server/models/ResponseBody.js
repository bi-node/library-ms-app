module.exports = class ResponseDto {
    constructor(data, message, status) {
        this.data = data;
        this.message = message;
        if (data && !status) { status = true; }
        this.status = status;
    }
}