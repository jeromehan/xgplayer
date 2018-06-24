class XHR {
    constructor ({url, method = 'GET', type = 'arraybuffer', data = {}} = {}) {
        return new Promise((resolve, reject)=>{
            let R = new XMLHttpRequest();
            let _method = method.toUpperCase();
            let _data = [];
            if (type) {
                R.responseType = type;
            }
            for (let k in data) {
                _data.push(`k=${data[k]}`);
            }
            if (_method === 'GET') {
                R.open(_method, `${url}?${_data.join('&')}`);
                R.send();
            } else if (_method === 'post') {
                R.open(_method, url);
                R.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                R.send(_data.join('&'));
            } else {
                throw `xhr ${_method} is not supported`;
            }
            R.onload = ()=>{
                if (R.status === 200 || R.status === 206) {
                    resolve(R);
                } else {
                    reject(R);
                }
            };
            R.onerror = ()=>{
                reject(R);
            };
        });
    }
}

export default XHR;
