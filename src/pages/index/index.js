import React,{Component} from 'react';
import store from '../../store'
import *  as actions from '../../store/action'
import './index.scss'
import {getHot, getLangs} from '../../api'
class Index extends Component{
    constructor(props){
        super(props);
        this.state=store.getState();
        this.handleInputChange=this.handleInputChange.bind(this);
        this.handleInputFocus=this.handleInputFocus.bind(this);
        store.subscribe(this.handStoreChange.bind(this));
    }

    componentWillMount(){
        getHot().then(res=>{
           let hotList=res.data.data;
           let action=actions.setHotList(hotList);
           store.dispatch(action);
        })
    }

    handStoreChange(){
        this.setState(store.getState());
    }
    handleInputFocus(){
            this.props.history.push('/main');
    }
    handleInputChange(e){
        let action=actions.changeSearhAction(e.target.value);
        store.dispatch(action)
    }
    handleHotTagClick(val){
        let action=actions.changeSearhAction(val);
        store.dispatch(action)
        this.props.history.push('/main');
    }
    render(){
        return (
            <div>
                <div className="page page1">
                    <div className="logo"></div>
                    <div className="searchBox">
                    <div className="mcon">
                        <input type="text" id="key"  width="600" placeholder="请输入要翻译的文本"  onFocus={this.handleInputFocus} />
                    </div>
                    <div className="serachicon"></div>
                    </div>
                    <div className="hot">
                    <div className="guide hoticon">热门查询</div>
                    <div className="hotcon">
                        {
                            this.state.hotList.map((item,k)=>{
                               return  <span key={item} onClick={()=>{this.handleHotTagClick(item)}}>{item}</span>
                            })
                        }
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Index;