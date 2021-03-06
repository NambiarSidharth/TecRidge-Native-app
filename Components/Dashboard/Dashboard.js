import React, { Component } from 'react'
import { Text, View ,ScrollView,TouchableOpacity} from 'react-native'
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {getCurrentProfile} from "../../Store/actions/profileAction"
import {Card,Avatar, Button,ButtonGroup,Overlay, Badge} from "react-native-elements"
import { Actions } from 'react-native-router-flux';
import MenuDrawer from 'react-native-side-drawer';
import Icon from "react-native-vector-icons/FontAwesome"
import Menu from "../SideMenu/Menu"
import Experience from "./Experience"
import Projects from "./Projects"
class Dashboard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             profile:null,
             isLoading:false,
             index:0,
             experience:false,
             project:false
        }
        // this.profileViewer=this.profileViewer.bind(this)
        this.topHandle=this.topHandle.bind(this)
        this.projectToggle=this.projectToggle.bind(this)
        this.experienceToggle=this.experienceToggle.bind(this)
    }
    componentDidMount(){
        this.setState({isLoading:true})
        console.log(this.props.uid);
        const {uid} = this.props;
        this.props.getCurrentProfile(uid)        
    }
    // profileViewer(){
    // +//send to profile page
    // Actions.profile({uid:this.props.uid});
    // }
    projectToggle(){
        const {project} = this.state;
        this.setState({project:!project})
    }
    experienceToggle(){
        const {experience} = this.state;
        this.setState({experience:!experience})
    }
    toggleSide(){
        this.setState({open:!this.state.open})
    }
    topHandle(index){
        this.setState({index})
    }
    render() {
        const {profile,loading} = this.props.profile;
        const {index} =this.state;
        let view;
        let menu =null;
        console.log(profile,loading)
        if(profile && !loading){
           menu=<Menu profile={profile}/>
            view=<View>
                {/* <Button title="Open" onPress={this.toggleSide} /> */}
                <ScrollView horizontal={true}>
                    <TouchableOpacity onPress={this.experienceToggle}>
                <Card>
                    <View style={{flexDirection:'row',justifyContent:"space-between"}}>
                    <Text>Experience </Text>
                    <Badge value={Object.keys(profile.experience).length} status="primary" />
                {/* <Experience profile={profile} /> */}
                    </View>
                </Card>
                </TouchableOpacity>
                <Overlay isVisible={this.state.experience}>
                    <View>
                    <Text>Experience</Text>
                   </View>
                   <View style={{flexDirection:"column-reverse",height:"100%"}}>
                       <View style={{height:"15%"}}>
                    <Button title='close' onPress={this.experienceToggle} />
                    </View>
                    <View style={{height:"80%"}}>
                    <Experience profile={profile} experienceToggle={this.experienceToggle}/>
                    </View>
                    </View>
                </Overlay>
                <TouchableOpacity onPress={this.projectToggle}>
                <Card>
                    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                    <Text>Projects</Text>
                    <Badge value={Object.keys(profile.projects).length} status="primary" />
                {/* <Projects profile={profile} /> */}
                    </View>
                </Card>
                </TouchableOpacity>
                <Overlay isVisible={this.state.project}>
                    <Text>Projects</Text>            
                        <Projects profile={profile} />
                    <Button title='close' onPress={this.projectToggle} />
                </Overlay>
                </ScrollView>
                <ScrollView>
                </ScrollView>
                </View>
        }else{
            view=<Card>
                <Text>Loading</Text>
                </Card>
        }
        return (
            <View style={{width:"100%",height:"100%"}}>
                <View>
                    <View>

                    </View>
                <View style={{flexDirection:"column-reverse",height:"100%",width:"100%"}}>
                    <View style={{height:"7%"}}>
                    < ButtonGroup
                onPress={this.topHandle}
                selectedIndex={this.state.index}
                buttons={[<Icon name='home' size={24} color="black" />,<Icon name='search' size={24} color="black" />,<Icon name='user' size={24} color="black" />]}
                containerStyle={{height:30,borderColor:"#ffffff"}}
                selectedButtonStyle={{backgroundColor:"#99bbff"}}
                /> 
                    </View>
                    <View style={{height:"93%"}}>
                    {view}
                    </View>
                </View>
                </View>
                
            </View>
        )
    }
}
const mapStateToProps = state=>({
    profile:state.profile
})

export default connect(mapStateToProps,{getCurrentProfile})(Dashboard);