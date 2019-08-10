import React,{Component} from 'react';
import *  as actions from '../../store/langs/action'
import './index.scss'
import {getLangs,getResult} from '../../api'
import {connect} from 'react-redux'
let isSub=false;
class Main extends Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){
        getLangs().then(res=>{
            let tagList=res.data.data;
            let aim={};
            let count=0;
            let size=3;//前3个默认选中
            for(let k in tagList){
                count++;
                aim[k]={
                    name:tagList[k],
                    choosed:count>3?false:true
                }
                
            }
            this.props.setTagList(aim);
         })
    }

    render(){
        let {search,tagList,result,handleTagClick,handleInputChange,handleSubResult} =this.props;
        handleTagClick=handleTagClick.bind(this);
        return (
            <div>
                <div className="page page2">
                    <div className="logo"></div>
                    <div className="guide">输入语句</div>
                    <div className="scon">
                        <input type="text" id="key2"  value={search} onChange={handleInputChange.bind(this)} />
                        <div className="close"></div>
                    </div>
                    <div className="guide">选择目标语言</div>
                    <div className="table">
                        {
                            Object.keys(tagList).map((key)=>{
                                return (
                                    <li onClick={()=>{handleTagClick(key)}}><a className={`react ${tagList[key]['choosed']?'on':''}`}>{tagList[key]['name']}</a></li>
                                )        
                            })
                        }
{/*                         <li v-for="(item,i) in languages" :key="item.key" ><a  :name="item.name" @click="chooseLangs(i)" :class="['react',{'on':item.choosed}]">{{item.name}}</a></li>
 */}                    </div>
                    <div className="sub" onClick={handleSubResult.bind(this)}>生成</div>
                    <div className="guide">结果</div>
                    <div className="result">
                   {/*  <div id="copyBtn" className="copy-btn">Copy</div> */}
                    <div className="rs" id="rs">
                        {
                            result.map(v=> (<span key={v}>{v}</span>))
                        }
                        
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return {
        search:state['langs']['search'],
        result:state['langs']['result'],
        tagList:state['langs']['tagList']
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        setTagList(aim){
                let action=actions.setTagList(aim);
                dispatch(action);
        },
        handleInputChange(e){
            let action=actions.changeSearhAction(e.target.value);
           dispatch(action)
        },
        handleTagClick(k){
            let action=actions.toggleTagChoosed(k);
            dispatch(action);
        },
        handleSubResult(){
            if(isSub) return;
            let arr=[];
            for(let i in this.props.tagList){
                if(this.props.tagList[i]['choosed']){
                    arr.push(i) 
                }
            }
            let params={
                query:this.props.search,
                langs:arr.join('&'),
              }
            isSub=true;
            getResult(params).then(res=>{
                isSub=false;
                let result=res.data.data;
                let action=actions.setResult(result);
                dispatch(action);
            })
        }
        
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Main);