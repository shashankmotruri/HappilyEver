import React, { useEffect , useState} from "react";
import { useHistory } from 'react-router-dom';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import {getUser,updateUser} from './APIcalls/user.js';

function UserProfile() {
  let history = useHistory();
  const handleLogout = () => {
    localStorage.setItem("login",false);
    localStorage.removeItem("user");
    history.push('/');
  }
  const [User,setUser] = useState();
  const [name,setName] = useState("michael");
  const [religion,setReligion] = useState("hindu");
  const [height,setHeight] = useState("180cm");
  const [dob,setDob] = useState("01-01-2000");
  const [file,setFile] = useState(null);

  const [presentUser,setPresentUser] = useState({
    "username" : "---",
    "name" : "---",
    "religion" : "---",
    "height" : "---",
    "dob" : "---",
  })

  useEffect(() =>{
    let user = localStorage.getItem("user");
    getUser(user)
    .then((res) => {
      console.log(res);
      setUser(res);
      setPresentUser({
        "username" : res.username,
        "name" : res.name,
        "religion" : res.religion,
        "height" : res.height,
        "dob" : res.dob
      })
      })
      .catch((err) => {
        console.log(err);
      })
    
    console.log(User)
  },[])

    let imageUrl;
  
    if(User !== undefined && User.img !== undefined){
      let binary = '';
      let bytes = [].slice.call(new Uint8Array(User.img.data.data));
      bytes.forEach((b) => binary += String.fromCharCode(b));
      imageUrl =  window.btoa(binary);
    }
    else{
      imageUrl = ""
    }

    const handleSubmit = () => {

      let id = localStorage.getItem("user");
      const currUser = {
        "name" : name,
        "religion" : religion,
        "height" : height,
        "dob" : dob,
        "file" : file
      }

      updateUser(currUser,id);
    }

  return (
    <>
      <div className="content">
        <br /><br />
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">Edit Profile</h5>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label>Name</label>
                        <Input
                          defaultValue="michael23"
                          placeholder="Username"
                          type="text"
                          value={name}
                          required
                          onChange={(e) => setName(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Religion
                        </label>
                        <Input 
                          type="text"
                          value={religion}
                          required
                          onChange={(e) => setReligion(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Height</label>
                        <Input
                          type="text"
                          value={height}
                          required
                          onChange={(e) => setHeight(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="6">
                      <FormGroup>
                        <label>Date Of Birth</label>
                        <Input
                          defaultValue="Andrew"
                          placeholder="Last Name"
                          type="date"
                          value={dob}
                          required
                          onChange={(e) => setDob(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Profile Pic</label>
                        <Input
                          accept=".png, .jpg, .jpeg"
                          type="file"
                          required
                          onChange={(e) => setFile(e.target.files[0])}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <CardFooter>
                <Button className="btn-fill" color="primary" type="submit">
                  Save
                </Button>
              </CardFooter>
                </Form>
              </CardBody>
           
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <CardBody>
                <CardText />
                <div className="author">
                  <div className="block block-one" />
                  <div className="block block-two" />
                  <div className="block block-three" />
                  <div className="block block-four" />
                  <center>
                    <img
                      alt="..."
                      className="avatar"
                      width="250"
                      height="250"
                      src={`data:image/jpeg;base64,${imageUrl}`}
                      style={{borderRadius: "25%"}}
                    /><br />
                    <h5 className="title">{presentUser.username}</h5>
              
                  </center>
                  <p className="description">{presentUser.name}</p>
                </div>
                <div className="card-description">
                  <p> Religion  :  {presentUser.religion}</p>
                  <p> DOB  :  {presentUser.dob}</p>
                  <p> Height  :  {presentUser.height}</p>
                  
                </div>
                <br />
                <center>
                  <Button onClick={handleLogout} color="danger" className="btn btn-primary">Logout</Button>
                </center>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default UserProfile;