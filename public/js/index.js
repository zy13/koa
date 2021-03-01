let btn = document.querySelector('.btn')
let upload = document.querySelector('#upload')
let contentList = document.querySelector('.content-list')
let taskBody = document.querySelector('.task_body')

// 点击button触发upload,显示上传对话框
btn.onclick = function() {
  upload.click()
}

// 监听upload的change事件,开始通过xhr进行上传
upload.onchange = function() {
  // 通过xhr进行上传
  const xhr = new XMLHttpRequest()

  const fd = new FormData() // 处理form-data格式
  fd.append('username', 'zy') // FileList对象
  fd.append('age', '18') // FileList对象
  fd.append('attachment', this.files.item(0)) // FileList对象
  console.log(this.files.item(0))

  xhr.open('post', '/upload', true)

  // 设置请求头
  // urlencode: k1=v1&k2=v2...
  // json: {'k1':'v1',...}
  // form-data: --${boundary}--
  // xhr.setRequestHeader('Content-Type','multipart/form-data; boundary=----WebKitFormBoundaryyb1zYhTI38xpQxBK')
  // xhr.send(`
  // ----WebKitFormBoundaryyb1zYhTI38xpQxBK
  // Content-Disposition: form-data; name="name"
  // 123
  // ----WebKitFormBoundaryyb1zYhTI38xpQxBK
  // `);

  // 上传form-data格式数据
  xhr.send(fd)

  // 监听上传进度
  let li = document.createElement('li')
  li.innerHTML = `<span>${this.files.item(0).name}</span>
  <div class="task-progress-status">0%</div>
  <div class="progress" style="width:0%;"></div>`
  taskBody.appendChild(li)

  xhr.onprogress = function(e) {
    let v = (e.loaded/e.total * 100).toFixed(2)
    li.children[1].innerHTML = li.children[2].style.width = `${v}%`
  }

  // 请求完成后
  xhr.onload = function () {
    console.log(xhr.responseText)
    let img = new Image()
    img.src = xhr.responseText

    contentList.appendChild(img)
  }


}