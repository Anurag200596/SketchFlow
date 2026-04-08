import Navbar from "./_Components/navbar"
import Orgsidebar from "./_Components/Orgsidebar"
import Sidebar from "./_Components/Sidebar"

interface dashboardLayoutProps{
    children: React.ReactNode
}

 const dashboardLayout = ({children} : dashboardLayoutProps)=>{
    return(
        <main className="h-full">
            <Sidebar/>
            <div className="pl-[60px] h-full">
                <div className="flex gap-x-3 h-full">
                    <Orgsidebar/>
                    <div className="h-full flex-1">
                      <Navbar/>
                     {children}  
                    </div>
                </div>
            </div>
        </main>
    )

}
export default dashboardLayout