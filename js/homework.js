var current = 0;
var res_data = '';
var bgimg = document.getElementById('app');
var bgtext = document.getElementsByClassName('mid')[0];

function init(callback){
    axios.get('https://run.mocky.io/v3/08c763ab-5bb2-46b7-a504-b9f28a8ba050')
    .then(function (res) {
        SetImgSrc(res.data.img);

        res_data = res.data.img;
        bgimg.style.backgroundImage = "url(" + "'" + res.data.img[0] + "'" + ")";
        bgtext.innerHTML = '1/' + res_data.length;

        console.log(res.data.img);
        // handle success
        // LoadImage(res.data.img, function(e){
        //     console.log('載入完成 ' + e);
        //     console.log(res.data.img);
        //     // SetImageSrc(res.data.img);
        //     // document.getElementsByClassName('load')[0].style.display = 'none';
        // });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed'
      });
}
function LoadIMG(arr, onComplete){
    var x = 0;
    for(var i = 0; i < arr.length; i++){
        var img = new Image();
        img.src = arr[i]
        img.onload = function(){
            x++
            if(x == arr.length){
                var testReturn = '測試用回傳文字';
                onComplete(testReturn);
            }
        }
    }
}
function SetImgSrc(arr){
    html = '';
    for(var i = 0; i < arr.length; i++){
        html += '<div>'
        html += '<img class="imgg" src="' + arr[i] + '" alt="error"/>';
        html += '</div>'
    }
    document.getElementById('img-list').innerHTML = html;
    for(var i = 0; i < arr.length; i++){
        var temp = document.getElementsByClassName('imgg')[i]
        temp.addEventListener('click', Clickhandle);
        temp.id = i;
    }
    document.getElementsByClassName('left')[0].addEventListener('click', function (){
        ClickBtn(1);
    });
    document.getElementsByClassName('right')[0].addEventListener('click', function (){
        ClickBtn(2);
    });
}
function ClickBtn(way){
    if(way === 2){
        current++;
    }
    else{
        current--;
    }
    if(current > res_data.length-1){
        current = 0;
    }
    else if(current < 0){
        current = res_data.length-1;
    }
    bgimg.style.backgroundImage = "url(" + "'" + res_data[current] + "'" + ")";
    bgtext.innerHTML = Number(current)+1 + "/" + res_data.length;
}
function Clickhandle(){
    bgimg.style.backgroundImage = "url(" + "'" + this.src + "'" + ")";
    current = this.id;
    bgtext.innerHTML = Number(current)+1 + "/" + res_data.length;
}
init();