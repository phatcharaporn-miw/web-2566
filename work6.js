
const firebaseConfig = {
    apiKey: "AIzaSyAEnPP1zMx30n-BS0XTciEzn3Il6xG9IYg",
    authDomain: "web2566-34401.firebaseapp.com",
    projectId: "web2566-34401",
    storageBucket: "web2566-34401.appspot.com",
    messagingSenderId: "126920306114",
    appId: "1:126920306114:web:ae824988d4dd744347ba5b",
    measurementId: "G-C2H8HZW093"
  };
firebase.initializeApp(firebaseConfig);      
const db = firebase.firestore();

db.collection("students").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} =>`,doc.data());
    });
});


const RB=ReactBootstrap;

class App extends React.Component{
    title = (
        <RB.Alert variant="info">
            <b>Work6 :</b> Firebase
        </RB.Alert>
    );
    footer = (
        <div>
            By 653380253-3 นางสาวพัชราพร นิลพงษ์<br />
            College of Computing, Khon Kaen University
        </div>
    );
    state = {
        scene: 0,
        students:[],
        std:{}
    }    
    render() {
        var stext = JSON.stringify(this.state.students);  
        return (
          <RB.Card>
            <RB.Card.Header>{this.title}</RB.Card.Header>  
            <RB.Card.Body>
              <RB.Button onClick={()=>this.readData()}>Read Data</RB.Button>
              <RB.Button onClick={()=>this.autoRead()}>Auto Read</RB.Button>
              <div>
                    <StudentTable data={this.state.students}/>
              </div>
            </RB.Card.Body>
            <RB.Card.Footer>{this.footer}</RB.Card.Footer>
          </RB.Card>          
        );
   }
  

   readData(){
    db.collection("students").get().then((querySnapshot) => {
        var stdlist=[];
        querySnapshot.forEach((doc) => {
            stdlist.push({id:doc.id,... doc.data()});                
        });
        console.log(stdlist);
        this.setState({students: stdlist});
        });
    } 

        autoRead(){
            db.collection("students").onSnapshot((querySnapshot) => {
                var stdlist=[];
                querySnapshot.forEach((doc) => {
                    stdlist.push({id:doc.id,... doc.data()});                
                });          
                this.setState({students: stdlist});
            });
        }
}
    

const container = document.getElementById("myapp");
const root = ReactDOM.createRoot(container);
root.render(<App />);

function StudentTable({data}){
    var rows=[];
    for(var s of data){
        rows.push(<tr>
        <td>{s.id}</td>
        <td>{s.title}</td>
        <td>{s.fname}</td>
        <td>{s.lname}</td>
        <td>{s.email}</td>
        </tr>)
    }
    return <table className='table'>
    <tr>
        <td>รหัส</td>
        <td>คำนำหน้า</td>
        <td>ชื่อ</td>
        <td>สกุล</td>
        <td>email</td>
        </tr>
        {rows}
    </table>

}
 