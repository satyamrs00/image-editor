document.addEventListener('DOMContentLoaded', () => {
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
                // context1.save();
                // context1.translate(canvas1.width/2,canvas1.height/2);
            
                context1.rotate(Math.PI/2);
                context1.drawImage(initialimage,-initialimage.width/2,-initialimage.height/2); 
                // context1.restore()           
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

            document.getElementById('final').onclick = () => {
                document.getElementById('output').src = canvas2.toDataURL();
                document.getElementById('close2').click();
            }
            document.getElementById('close1').click();
        }
    }

    document.getElementById('close1').onclick = () => {
        document.getElementById('input').value = '';
    }


});