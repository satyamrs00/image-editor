document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('output').src = localStorage.getItem('image') || '';
    document.getElementById('download').href = localStorage.getItem('image') || '';
    localStorage.getItem('image') ? document.getElementById('download').style.display = 'block' : document.getElementById('download').style.display = 'none';
    

    document.getElementById('input').onchange = (e) => {
        document.getElementById('cropmodalbutton').click();

        const file = e.target.files[0];
        const canvas1 = document.getElementById('canvas1');
        const context1 = canvas1.getContext('2d');
        const initialimage = document.getElementById('initialimage');

        initialimage.src = URL.createObjectURL(file);

        initialimage.onload = () => {
            canvas1.width = document.querySelector('#cropmodal .modal-body').offsetWidth - parseInt(getComputedStyle(document.querySelector('#cropmodal .modal-body')).paddingLeft) - parseInt(getComputedStyle(document.querySelector('#cropmodal .modal-body')).paddingRight);
            canvas1.height = parseInt(canvas1.width * initialimage.height / initialimage.width);

            const cropdiv = document.getElementById('cropdiv');
            cropdiv.style.width = (canvas1.width - 100).toString() + 'px';
            cropdiv.style.height = (canvas1.height - 100).toString() + 'px';
            cropdiv.style.top = (parseInt(getComputedStyle(document.querySelector('#cropmodal .modal-body')).paddingTop) + 50).toString() + 'px';
            cropdiv.style.left = (parseInt(getComputedStyle(document.querySelector('#cropmodal .modal-body')).paddingLeft) + 50).toString() + 'px';


            context1.drawImage(initialimage, 0, 0, canvas1.width, canvas1.height);

            document.getElementById('rotate').onclick = () => {
                // console.log('rotate');
                var mCanvas=document.createElement('canvas');
                mCanvas.width=canvas1.width;
                mCanvas.height=canvas1.height;
                var mctx=mCanvas.getContext('2d');
              
                mctx.drawImage(canvas1,0,0);
                context1.clearRect(0,0,canvas1.width,canvas1.height);
              
                let h = canvas1.height;
                let w = canvas1.width;
                canvas1.height = w;
                canvas1.width = h;
                const cropdiv = document.getElementById('cropdiv');
                cropdiv.style.width = (canvas1.width - 100).toString() + 'px';
                cropdiv.style.height = (canvas1.height - 100).toString() + 'px';
                cropdiv.style.top = (parseInt(getComputedStyle(document.querySelector('#cropmodal .modal-body')).paddingTop) + 50).toString() + 'px';
                cropdiv.style.left = (parseInt(getComputedStyle(document.querySelector('#cropmodal .modal-body')).paddingLeft) + 50).toString() + 'px';

                context1.translate(canvas1.width/2,canvas1.height/2);
              
                var radians=90/180*Math.PI;
                context1.rotate(radians);
              
                context1.drawImage(mCanvas,-w/2,-h/2);
              
                context1.rotate(-radians);
                context1.translate(-canvas1.width/2,-canvas1.height/2);
            }

            document.getElementById('fliph').onclick = () => {
                let c = document.createElement('canvas');
                c.width = canvas1.width;
                c.height = canvas1.height;
                let ctx = c.getContext('2d');
                ctx.translate(canvas1.width, 0);
                ctx.scale(-1, 1);
                ctx.drawImage(canvas1, 0, 0, canvas1.width, canvas1.height);
                context1.drawImage(c, 0, 0, canvas1.width, canvas1.height);
            }
            document.getElementById('flipv').onclick = () => {
                let c = document.createElement('canvas');
                c.width = canvas1.width;
                c.height = canvas1.height;
                let ctx = c.getContext('2d');
                ctx.translate(0, canvas1.height);
                ctx.scale(1, -1);
                ctx.drawImage(canvas1, 0, 0, canvas1.width, canvas1.height);
                context1.drawImage(c, 0, 0, canvas1.width, canvas1.height);
            }
        }

        document.getElementById('crop').onclick = () => {
            document.getElementById('effectsmodalbutton').click();

            const canvas2 = document.getElementById('canvas2');
            const context2 = canvas2.getContext('2d');
            const cropdiv = document.getElementById('cropdiv');
            console.log();
            canvas2.width = parseInt(cropdiv.style.width) + 6;
            canvas2.height = parseInt(cropdiv.style.height) + 6;
            context2.drawImage(canvas1, parseInt(cropdiv.style.left) - parseInt(getComputedStyle(document.querySelector('#cropmodal .modal-body')).paddingLeft), parseInt(cropdiv.style.top) - parseInt(getComputedStyle(document.querySelector('#cropmodal .modal-body')).paddingTop), parseInt(cropdiv.style.width) + 6, parseInt(cropdiv.style.height) + 6, 0, 0, parseInt(cropdiv.style.width) + 6, parseInt(cropdiv.style.height) + 6);

            document.querySelectorAll('.f').forEach((f) => {
                f.onclick = () => {
                    context2.clearRect(0, 0, canvas2.width, canvas2.height);
                    let w = canvas2.width;
                    let h = canvas2.height;
                    if (w > h){
                        canvas2.height = w;
                    } else {
                        canvas2.width = h;
                    }
                    context2.drawImage(canvas1, parseInt(cropdiv.style.left) - parseInt(getComputedStyle(document.querySelector('#cropmodal .modal-body')).paddingLeft), parseInt(cropdiv.style.top) - parseInt(getComputedStyle(document.querySelector('#cropmodal .modal-body')).paddingTop), parseInt(cropdiv.style.width) + 6, parseInt(cropdiv.style.height) + 6, 0, 0, canvas2.width, canvas2.height);
                    context2.globalCompositeOperation = 'destination-in';
                    context2.drawImage(document.querySelector("#" + f.id + " img"), 0, 0, canvas2.width, canvas2.width);
                }
            });
            document.getElementById('original').onclick = () => {
                canvas2.width = parseInt(cropdiv.style.width) + 6;
                canvas2.height = parseInt(cropdiv.style.height) + 6;
                context2.drawImage(canvas1, parseInt(cropdiv.style.left) - parseInt(getComputedStyle(document.querySelector('#cropmodal .modal-body')).paddingLeft), parseInt(cropdiv.style.top) - parseInt(getComputedStyle(document.querySelector('#cropmodal .modal-body')).paddingTop), parseInt(cropdiv.style.width) + 6, parseInt(cropdiv.style.height) + 6, 0, 0, parseInt(cropdiv.style.width) + 6, parseInt(cropdiv.style.height) + 6);    
            }

            document.getElementById('final').onclick = () => {
                document.getElementById('output').src = canvas2.toDataURL();
                document.getElementById('output').style.display = 'block';
                document.getElementById('download').style.display = 'block';
                document.getElementById('download').href = canvas2.toDataURL();
                localStorage.setItem('image', canvas2.toDataURL());
                document.getElementById('close2').click();
            }
            document.getElementById('close1').click();
        }
    }

    document.getElementById('close1').onclick = () => {
        document.getElementById('input').value = '';
    }


});