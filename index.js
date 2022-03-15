function change() {
    var fetch_content = document.getElementById("fetch_content").value;
    try {
        url = fetch_content.split("\", {")[0].substring(7);
        json_obj = JSON.parse("{" + fetch_content.split("\", {")[1].slice(0, -2));
        headers = JSON.stringify(json_obj.headers);
        method = json_obj.method;
        body = json_obj.body;
        headers = new JSONFormat(headers, 8).toString();
        var request_content = 'url = \'' + url + '\'\r' + 'headers = ' + headers + '\r';
        if (method == "GET") {
            request_content += 'r = requests.get(url = url, headers = headers)'
        } else if (method == "POST") {
            request_content += 'data = \'' + body + '\'\r' + 'r = requests.post(url = url, data = data, headers = headers)'
        }
        document.getElementById("request_content").value = request_content;
    } catch (error) {
        console.log(error)
        alert('错误：请检查格式是否正确');
    }
}

function copy() {
    var content = document.getElementById('request_content');
    content.select();
    document.execCommand('copy');
    alert('复制成功');
}