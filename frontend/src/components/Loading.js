import LoadingIcons from 'react-loading-icons'

const Loading =()=> (
    <div style={{display:"block", width:"fit-content", margin:"10px auto"}}>
        <LoadingIcons.TailSpin height={22} width={22} stroke="white"/>
    </div>
)

export default Loading;