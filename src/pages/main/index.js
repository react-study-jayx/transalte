import React,{Component} from 'react';
import store from '../../store'
import *  as actions from '../../store/action'
import './index.scss'
import {getLangs,getResult} from '../../api'
let isSub=false;
class Index extends Component{
    constructor(props){
        super(props);
        this.state=store.getState();
        this.handleInputChange=this.handleInputChange.bind(this);
        this.handleSubResult=this.handleSubResult.bind(this);
        store.subscribe(this.handStoreChange.bind(this));
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
            let action=actions.setTagList(aim);
            store.dispatch(action);
         })
    }

    handStoreChange(){
        this.setState(store.getState());
    }

    handleInputChange(e){
        //console.log(e,e.target.value);
        let action=actions.changeSearhAction(e.target.value);
        store.dispatch(
            action
        )
    }
    handleTagClick(k){
        let action=actions.toggleTagChoosed(k);
        store.dispatch(action);
    }
    handleSubResult(){
        if(isSub) return;
        let arr=[];
        for(let i in this.state.tagList){
            if(this.state.tagList[i]['choosed']){
                arr.push(i) 
            }
        }
        let params={
            query:this.state.search,
            langs:arr.join('&'),
          }
        isSub=true;
        getResult(params).then(res=>{
            isSub=false;
            let result=res.data.data;
            let action=actions.setResult(result);
            store.dispatch(action);
        })
    }
    render(){
        let tagList=this.state.tagList;
        return (
            <div>
                <div className="page page2">
                    <div className="logo"></div>
                    <div className="guide">输入语句</div>
                    <div className="scon">
                        <input type="text" id="key2"  value={this.state.search} onChange={this.handleInputChange} />
                        <div className="close"></div>
                    </div>
                    <div className="guide">选择目标语言</div>
                    <div className="table">
                        {
                            Object.keys(tagList).map((key)=>{
                                return (
                                    <li onClick={()=>{this.handleTagClick(key)}}><a className={`react ${tagList[key]['choosed']?'on':''}`}>{tagList[key]['name']}</a></li>
                                )        
                            })
                        }
{/*                         <li v-for="(item,i) in languages" :key="item.key" ><a  :name="item.name" @click="chooseLangs(i)" :class="['react',{'on':item.choosed}]">{{item.name}}</a></li>
 */}                    </div>
                    <div className="sub" onClick={this.handleSubResult}>生成</div>
                    <div className="guide">结果</div>
                    <div className="result">
                   {/*  <div id="copyBtn" className="copy-btn">Copy</div> */}
                    <div className="rs" id="rs">
                        {
                            this.state.result.map(v=> (<span key={v}>{v}</span>))
                        }
                        
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Index;