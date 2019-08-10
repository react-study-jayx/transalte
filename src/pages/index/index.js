import React,{Component} from 'react';
import {connect} from 'react-redux'
import *  as actions from '../../store/langs/action'
import './index.scss'
class Index extends Component{
    constructor(props){
        super(props);
       // this.handleHotTagClick=this.handleHotTagClick.bind(this);
    }

    componentWillMount(){
        this.props.setHotList();
    }

    handleInputFocus(){
            this.props.history.push('/main');
    }
    
    render(){
        let {hotList,handleHotTagClick}=this.props;

        console.log('this.props',this.props)
        handleHotTagClick=handleHotTagClick.bind(this);
        return (
            <div>
                <div className="page page1">
                    <div className="logo"></div>
                    <div className="searchBox">
                    <div className="mcon">
                        <input type="text" id="key"  width="600" placeholder="请输入要翻译的文本"  onFocus={this.handleInputFocus.bind(this)} />
                    </div>
                    <div className="serachicon"></div>
                    </div>
                    <div className="hot">
                    <div className="guide hoticon">热门查询</div>
                    <div className="hotcon">
                        {
                            hotList.map((item,k)=>{
                               return  <span key={item} onClick={()=>{handleHotTagClick(item)}}>{item}</span>
                            })
                        }
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    console.log('state is',state)
    return {
        hotList:state['langs'].hotList,
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        setHotList:()=>{
            let action=actions.setHotList;
            dispatch(action());
        },
        handleInputChange:(e)=>{
            let action=actions.changeSearhAction(e.target.value);
            dispatch(action)
        },
        handleHotTagClick(val){
            let action=actions.changeSearhAction(val);
            dispatch(action)
            console.log(' this.props', this.props)
            this.props.history.push('/main');
        }
    }   
}
export default  connect(mapStateToProps,mapDispatchToProps)(Index);