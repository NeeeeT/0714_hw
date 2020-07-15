var current = 0;
var res_data = '';
var bgimg = document.getElementById('app');
var bgtext = document.getElementsByClassName('mid')[0];

function init(callback){
    axios.get('https://run.mocky.io/v3/08c763ab-5bb2-46b7-a504-b9f28a8ba050')
    .then(function (res) {
        res_data = res.data.img;
        SetImgSrc(res.data.img);
        ImgChange();
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed'
      });
}
function SetImgSrc(arr){
    html = '';
    for(var i = 0; i < arr.length; i++){
        // html += '<div>'
        // html += '<img class="imgg" src="' + arr[i] + '" alt="error"/>';
        // html += '</div>'
        html += `
            <div><img class='imgg' src=${arr[i]} alt='ERROR'/></div>
        `
    };
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
    ImgChange();
}
function Clickhandle(){
    current = this.id;
    ImgChange();
}
function ImgChange(){
    // bgimg.style.backgroundImage = "url(" + "'" + res_data[current] + "'" + ")";
    // bgtext.innerHTML = Number(current)+1 + "/" + res_data.length;
    bgimg.style.backgroundImage = `url('${res_data[current]}')`;
    bgtext.innerHTML = `${Number(current)+1}/${res_data.length}`;
}
init();