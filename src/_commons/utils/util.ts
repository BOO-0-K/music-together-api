class Util {
    // YouTube Url 유효성 검사
    static isValidYoutubeUrl(url: string): boolean {
        const regex =
            /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|v\/)?[\w-]{11}(&.*)?$/;
        return regex.test(url);
    }
}

export default Util;
