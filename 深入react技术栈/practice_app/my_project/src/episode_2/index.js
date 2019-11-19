import React from 'react';
import UseReactAndOriginalEvent from './1.useReactAndOriginalEvent';
import Checkbox from './2.CheckBox';
import SelectComponent from './3.selectComponent';
import NumerousInputs from './4.numerousInputs';
export default class EventCollection extends React.Component {
    constructor(props) {
        super(props);
        this.inputFile = React.createRef();
        this.img = React.createRef();
        this.img1 = React.createRef();
    }
    selectImg = () => {
        // let fontfile  = getBase64Image(this.inputFile.current.files[0])
        let reader = new FileReader();
        let that = this;
        reader.onload = function(e) {
            that.img.current.src = e.target.result;
            let result = getBase64Image(that.img.current);
            localStorage.setItem("imgData",result);
            let dataImage = localStorage.getItem('imgData');
            that.img1.current.src = dataImage;;
            
        }
        reader.readAsDataURL(this.inputFile.current.files[0])
        // console.log(fontfile)
        
        function getBase64Image(img) {
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height; 
            console.log(img)
            ctx.drawImage(img, 0, 0, img.width, img.width);
            var dataURL = canvas.toDataURL("image/png");
            // console.log(dataURL)
            return dataURL;
        }
    }
    componentDidMount() {
        let a = {
            value: 1,
            // valueOf() {
            //     console.log(typeof this.value)
            //     return Number(this.value++)
            // }
        } 
        // Object.prototype.valueOf = function () {
        //     return this.value++// number
        // }
        Object.prototype.valueOf = function () {
            return this.value++// number
        }
        Object.prototype.toString = function() {
            console.log(888)
        }
        console.log(a==1 && a==2)

        function MyNumberType(n) {
            this.number = n;
        }
          
        MyNumberType.prototype.valueOf = function() {
            return this.number;
        };
          
        const object1 = new MyNumberType(4);
        console.log(object1 === 4)
    }
    render() {
        return (
            <div>
                <UseReactAndOriginalEvent/>
                <Checkbox/>
                <hr/>
                <SelectComponent/>
                <hr/>
                <NumerousInputs/>
                <input 
                        type="file" 
                        ref={this.inputFile}
                        onChange={this.selectImg}
                    />
                <img src='' ref={this.img} id="img"/>
                <img src='' ref={this.img1} id="img1"/>
            </div>
        )
    } 
}