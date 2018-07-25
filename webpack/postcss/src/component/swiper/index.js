import React,{Component} from 'react';
import Swiper from 'react-id-swiper';
import 'react-id-swiper/src/styles/scss/swiper.scss';
import './swipers.scss';

class SwiperComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            params:{
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                    clickable: true
                  },
                autoplay: {
                    delay:3000,
                    disableOnInteraction: false,
                },
            }
        }
    }
    render(){
        let {params} = this.state;
        return(
            <div className="banners">
                <Swiper {...params}>
                    <div><a className="ad_banner1 ad_banner" href=""></a></div>
                    <div><a className="ad_banner2 ad_banner" href="">
                        <span></span>
                    </a></div>
                    <div><a className="ad_banner3 ad_banner" href=""></a> </div>
                </Swiper>
            </div>
        )
    }
    
}

export default SwiperComponent;