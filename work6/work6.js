class App extends React.Component {
    title = (
      <p>Work 6 Firebase</p>
    );
    footer = (
      <div>
        By 653380107-4 พีรพล เล่าสุอังกูร<br />
        College of Computing, Khon Kaen University
      </div>
    );
    state = {
        scene: 0,
        students:[],
        stdid:"",
        stdfname:"",
        stdlname:"",
        stdemail:"",
        stdtitle:"",
    } 

    render() {
      var stext = JSON.stringify(this.state.students);  
      return (
        <>
            <div className="header flex items-center gap-5 mb-5 bg-slate-700">
                <div className="logo w-30 h-30"></div>
                <div className="text-white text-2xl font-bold ">{this.title}</div>
            </div>
            <div className="groupBtn mx-auto w-fit mb-5">
                <button onClick={()=>this.readData()}
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >Read Data</button>
                <button  onClick={()=>this.autoRead()}
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >Auto Read</button>
            </div>
            <div className="w-fit mx-auto mb-5 ">
                <Table students = {this.state.students} app={this} />
                {/* {table(this.state.students,App)} */}
            </div>
            <div className="form border flex grid w-1/4 gap-1 rounded-lg mx-auto p-5">
                <TextInput label="ID" app={this} value="stdid"/>  
                <TextInput label="title" app={this} value="stdtitle"/> 
                <TextInput label="ชื่อ" app={this} value="stdfname"/>
                <TextInput label="สกุล" app={this} value="stdlname"/>
                <TextInput label="Email" app={this} value="stdemail"/>       
                <button
                className="mt-2 w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                onClick={() => this.insertData()}
                >เพิ่มข้อมูล</button>
            </div>
        </>
                   
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
        })
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
    insertData(){
        db.collection("students").doc(this.state.stdid).set({
            id : this.state.stdid,
            title : this.state.stdtitle,
            fname : this.state.stdfname,
            lname : this.state.stdlname,
            email : this.state.stdemail,
        });
    }
    edit(std){     
        this.setState({
         stdid    : std.id,
         stdtitle : std.title,
         stdfname : std.fname,
         stdlname : std.lname,
         stdemail : std.email,
        })
    }
    delete(std){
        if(confirm("ต้องการลบข้อมูล")){
           db.collection("students").doc(std.id).delete();
        }
    }

}

function DeleteText({
    std,app
}){
    return <td onClick={()=>app.delete(std)} className="px-6 py-4 hover:bg-gray-200 text-red-500 cursor-pointer">
                Delete
    </td>
}

function EditButton({std,app}){
    return (
        <td onClick={()=>app.edit(std)} className="px-6 py-4 hover:bg-gray-200 text-yellow-500 cursor-pointer">
                                    Edit</td>
    )
}


function Table({students,app}) {

    return(
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-fit">
            <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr >
                        <th scope="col" className="px-6 py-3 text-black">รหัสนักศึกษา</th>
                        <th scope="col" className="px-6 py-3 text-black">คำนำหน้า</th>
                        <th scope="col" className="px-6 py-3 text-black">ชื่อ</th>
                        <th scope="col" className="px-6 py-3 text-black">นามสกุล</th>
                        <th scope="col" className="px-6 py-3 text-black">อีเมล</th>
                    </tr>
                </thead>
                <tbody className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    {
                        // console.log(students)
                        students.map((Column) => (
                            <tr className=" hover:bg-gray-100">
                                <td className="px-6 py-4 text-black">{Column.id}</td>
                                <td className="px-6 py-4 text-black">{Column.title}</td>
                                <td className="px-6 py-4 text-black">{Column.fname}</td>
                                <td className="px-6 py-4 text-black">{Column.lname}</td>
                                <td className="px-6 py-4 text-black">{Column.email}</td>
                                <EditButton std={Column} app={app}/>
                                <DeleteText std={Column} app={app}/>
                                
                            </tr>  
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}



function TextInput({label,app,value}){
    return (
        <>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={app.state[value]} onChange={(ev)=>{
            var s={};
            s[value]=ev.target.value;
            app.setState(s)}
        }></input>
        </>
        
    )

  }




const firebaseConfig = {
    apiKey: "AIzaSyBxmQMSCYV4JYPJdMxybOnw7Nl0ZAYGGlA",
    authDomain: "web2566-dee2b.firebaseapp.com",
    projectId: "web2566-dee2b",
    storageBucket: "web2566-dee2b.appspot.com",
    messagingSenderId: "496332500574",
    appId: "1:496332500574:web:0815fab8ec80798eebcecf",
    measurementId: "G-5457M47MBF"
};
firebase.initializeApp(firebaseConfig);      
const db = firebase.firestore();
db.collection("students").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} =>`,doc.data());
    });
});




const container = document.getElementById("myapp");
const root = ReactDOM.createRoot(container);
root.render(<App />);
