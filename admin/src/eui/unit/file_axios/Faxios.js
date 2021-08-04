import axios from "axios"
let url = "http://localhost/file/upload" //上传链接
const file = {
    upload(name, data) { //上传文件
        let from_data = new FormData();
        from_data.append(name, data);
        let config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        };
        return axios.post(url, from_data, config)
    },
}
export default file