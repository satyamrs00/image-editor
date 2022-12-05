document.addEventListener('DOMContentLoaded', () => {
    const cropdiv = document.getElementById('cropdiv');
    cropdiv.onmousedown = (e) => {
        if (e.target.id === 'cropdiv') {
            const cropdiv = document.getElementById('cropdiv');
            const cropdivstyle = getComputedStyle(cropdiv);
            const cropdivwidth = parseInt(cropdivstyle.width);
            const cropdivheight = parseInt(cropdivstyle.height);
            const cropdivleft = parseInt(cropdivstyle.left);
            const cropdivtop = parseInt(cropdivstyle.top);
    
            const mousex = e.clientX
            const mousey = e.clientY
    
            document.onmousemove = (e) => {
                const newmousex = e.clientX
                const newmousey = e.clientY
    
                const newcropdivleft = cropdivleft + newmousex - mousex;
                const newcropdivtop = cropdivtop + newmousey - mousey;
                
                if (newcropdivleft >= 0 && newcropdivleft + cropdivwidth <= document.querySelector('#cropmodal .modal-body').offsetWidth) {
                    cropdiv.style.left = newcropdivleft + 'px';
                }
                if (newcropdivtop >= 0 && newcropdivtop + cropdivheight <= document.querySelector('#cropmodal .modal-body').offsetHeight) {
                    cropdiv.style.top = newcropdivtop + 'px';
                }
            }    
        }
    }
    cropdiv.onmouseup = () => {
        document.onmousemove = null;
    }

    document.querySelectorAll('#cropdiv span').forEach(span => {
        span.onmousedown = (e) => {
            const cropdiv = document.getElementById('cropdiv');
            const cropdivstyle = getComputedStyle(cropdiv);
            const cropdivwidth = parseInt(cropdivstyle.width);
            const cropdivheight = parseInt(cropdivstyle.height);
            const cropdivleft = parseInt(cropdivstyle.left);
            const cropdivtop = parseInt(cropdivstyle.top);

            const mousex = e.clientX
            const mousey = e.clientY

            document.onmousemove = (e) => {
                const newmousex = e.clientX
                const newmousey = e.clientY

                if(e.target.id === 'span2') {
                    const newcropdivwidth = cropdivwidth + newmousex - mousex;
                    const newcropdivheight = cropdivheight - newmousey + mousey;
                    
                    if (newcropdivwidth >= 0 && newcropdivwidth + cropdivleft <= document.querySelector('#cropmodal .modal-body > div').offsetWidth) {
                        cropdiv.style.width = newcropdivwidth + 'px';
                    }
                    if (newcropdivheight >= 0 && newcropdivheight + cropdivtop <= document.querySelector('#cropmodal .modal-body > div').offsetHeight) {
                        cropdiv.style.height = newcropdivheight + 'px';
                        cropdiv.style.top = cropdivtop + newmousey - mousey + 'px';
                    }
                }
                if(e.target.id === 'span1') {
                    const newcropdivwidth1 = cropdivwidth - newmousex + mousex;
                    const newcropdivheight1 = cropdivheight - newmousey + mousey;
                    
                    if (newcropdivwidth1 >= 0 && newcropdivwidth1 + cropdivleft <= document.querySelector('#cropmodal .modal-body > div').offsetWidth) {
                        cropdiv.style.width = newcropdivwidth1 + 'px';
                        cropdiv.style.left = cropdivleft + newmousex - mousex + 'px';
                    }
                    if (newcropdivheight1 >= 0 && newcropdivheight1 + cropdivtop <= document.querySelector('#cropmodal .modal-body > div').offsetHeight) {
                        cropdiv.style.height = newcropdivheight1 + 'px';
                        cropdiv.style.top = cropdivtop + newmousey - mousey + 'px';
                    }
                }
                if(e.target.id === 'span3') {
                    const newcropdivwidth = cropdivwidth + newmousex - mousex;
                    const newcropdivheight = cropdivheight + newmousey - mousey;
                    
                    if (newcropdivwidth >= 0 && newcropdivwidth + cropdivleft <= document.querySelector('#cropmodal .modal-body > div').offsetWidth) {
                        cropdiv.style.width = newcropdivwidth + 'px';
                    }
                    if (newcropdivheight >= 0 && newcropdivheight + cropdivtop <= document.querySelector('#cropmodal .modal-body > div').offsetHeight) {
                        cropdiv.style.height = newcropdivheight + 'px';
                    }
                }
                if(e.target.id === 'span4') {
                    const newcropdivwidth = cropdivwidth - newmousex + mousex;
                    const newcropdivheight = cropdivheight + newmousey - mousey;
                    
                    if (newcropdivwidth >= 0 && newcropdivwidth + cropdivleft <= document.querySelector('#cropmodal .modal-body > div').offsetWidth) {
                        cropdiv.style.width = newcropdivwidth + 'px';
                        cropdiv.style.left = cropdivleft + newmousex - mousex + 'px';
                    }
                    if (newcropdivheight >= 0 && newcropdivheight + cropdivtop <= document.querySelector('#cropmodal .modal-body > div').offsetHeight) {
                        cropdiv.style.height = newcropdivheight + 'px';
                    }
                }
            }
        }
        span.onmouseup = () => {
            document.onmousemove = null;
        }
    });
    document.querySelector('#cropmodal .modal-body > div').onmouseup = () => {
        document.onmousemove = null;
    }
});