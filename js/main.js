$(function(){
  // 初始化右侧滚动条
  // 这个方法定义在scroll.js中
  resetui()

  function getMsg(inf) {
    $.ajax({
      method: 'GET',
      url: 'http://www.liulongbin.top:3006/api/robot',
      data: {
        spoken: inf
      },
      success: function(reg) {
        if(reg.data) {
          var text = reg.data.info.text
          var leftWord = `
          <li class="left_word">
            <img src="img/person01.png" /> <span>${text}</span>
          </li>
          `
          $('#talk_list').append(leftWord)
          resetui()

          getAudio(text)
        }
      }
    })
  }

  //得到语音
  function getAudio(msg) {
    $.ajax({
      method: 'GET',
      url: 'http://www.liulongbin.top:3006/api/synthesize',
      data: {
        text: msg
      },
      success: function(reg) {
        if(reg.status === 200) {
          $('#audio').prop('src', reg.voiceUrl)
        }
        console.log(reg);
      }
    })
  }

  //给发送按钮绑定点击事件
  $('#send').on('click', function() {
    var inf = $('#infinp').val().trim()
    if(inf === '') return $('#infinp').val('')
    var rightWord = `
    <li class="right_word">
      <img src="img/person02.png" /> <span>${inf}</span>
    </li>
    `
    $('#talk_list').append(rightWord)
    $('#infinp').val('')
    resetui()

    getMsg(inf)
    resetui()
  })

  //实现回车调用发送按钮的点击事件
  $('#infinp').on('keyup', function(e) {
    if(e.keyCode === 13) {
      $('#send').click()
    }
  })
})