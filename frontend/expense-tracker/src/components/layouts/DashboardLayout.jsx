import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";


const DashboardLayout = ({children, activeMenu}) => {
    const { user } = useContext(UserContext);
  return (
    <div className="">
        <Navbar activeMenu={activeMenu} />

        {user && (
            <div className="flex">
                <div className="max-[1080px]:hidden">
                    <SideMenu activeMenu={activeMenu} />
                </div>

                <div className="grow mx-5">{children}</div>
            </div>
        )}
    </div>
  );
};

export default DashboardLayout


// import React, { useContext } from 'react';
// import { UserContext } from '../../context/UserContext';
// import Navbar from "./Navbar";
// import SideMenu from "./SideMenu";

// const DashboardLayout = ({ children, activeMenu }) => {
//   const { user } = useContext(UserContext);

//   // Optional: Show a loading state while user data is not ready
//   if (user === null) {
//     return (
//       <div className="flex flex-col min-h-screen">
//         <Navbar activeMenu={activeMenu} />
//         <div className="flex justify-center items-center grow">
//           <p className="text-gray-500">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Navbar is always visible */}
//       <Navbar activeMenu={activeMenu} />

//       {/* Main content */}
//       <div className="flex grow">
//         {/* Sidebar */}
//         <div className="max-[1080px]:hidden">
//           <SideMenu activeMenu={activeMenu} />
//         </div>

//         {/* Page content */}
//         <div className="grow mx-5">{children}</div>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;
