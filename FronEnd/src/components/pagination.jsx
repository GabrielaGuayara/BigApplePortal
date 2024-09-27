
  // const [apprenticeships, setApprenticeships] = useState([]);
  // const [filteredApprenticeships, setFilteredApprenticeships] = useState([]);
  // const [searchTerm, setSearchTerm] = useState('');
  // const [borough, setBorough] = useState('');
  // const [currentPage, setCurrentPage] = useState(1);
  // const [itemsPerPage] = useState(9);

  // useEffect(() => {
  //   fetch('http://localhost:8080/api/apprenticeships')
  //     .then(response => response.json())
  //     .then(data => {
  //       setApprenticeships(data);
  //       setFilteredApprenticeships(data);
  //     })
  //     .catch(error => {
  //       console.error('There was an error fetching the apprenticeships!', error);
  //     });
  // }, []);

  // useEffect(() => {
  //   filterApprenticeships();
  // }, [searchTerm, borough]);

  // const filterApprenticeships = () => {
  //   let filtered = apprenticeships;

  //   if (searchTerm) {
  //     filtered = filtered.filter(apprenticeship =>
  //       apprenticeship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       apprenticeship.company.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //   }

  //   if (borough) {
  //     filtered = filtered.filter(apprenticeship => 
  //       apprenticeship.location.toLowerCase().includes(borough.toLowerCase())
  //     );
  //   }

    // if (isRemote) {
    //   filtered = filtered.filter(apprenticeship => 
    //     isRemote === 'remote' ? apprenticeship.remote : !apprenticeship.remote
    //   );
    // }

  //   setFilteredApprenticeships(filtered);
  //   setCurrentPage(1);
  // };

  // const handleSearch = () => {
  //   setHasSearched(true);
  //   filterApprenticeships();
  // };

  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentApprenticeships = filteredApprenticeships.slice(indexOfFirstItem, indexOfLastItem);

  // Change page


const paginate = (pageNumber) => setCurrentPage(pageNumber);



function Pagination({ itemsPerPage, totalItems, paginate, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="flex space-x-2">
        {pageNumbers.map(number => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`px-3 py-1 rounded-md ${
                currentPage === number
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}




    // <div className="container mx-auto p-4 bg-yellow-50 w-full">
    //   <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">Apprenticeships</h1>
    //   <div className="mb-6 flex gap-4 justify-center w-1/2 mx-auto">
    //  
    //   <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //     {currentApprenticeships.map(apprenticeship => (
    //       <li 
    //         key={apprenticeship.id} 
    //         className="p-6 border border-sky-300 rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white"
    //       >
    //         <h2 className="text-2xl font-semibold ">{apprenticeship.title}</h2>
    //         <p className="text-gray-700">{apprenticeship.description}</p>
    //         <p className="text-gray-700">Company: {apprenticeship.company}</p>
    //         <p className="text-gray-700">Location: {apprenticeship.location}</p>
    //         <p className="text-gray-700">{apprenticeship.remote ? 'Remote' : 'In-Person'}</p>
    //       </li>
    //     ))}
    //   </ul>
    //   <div className="flex justify-center mt-6">
    //     <Pagination
    //       itemsPerPage={itemsPerPage}
    //       totalItems={filteredApprenticeships.length}
    //       paginate={paginate}
    //       currentPage={currentPage}
    //     />
    //   </div>
    // </div>
    import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { BarChart3, FileText, Home, PlusCircle, Users } from "lucide-react"

// export default function EmployerDashboard() {
//   return (
//     <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
//       <div className="hidden border-r bg-gray-100/40 lg:block">
//         <div className="flex h-full max-h-screen flex-col gap-2">
//           <div className="flex h-[60px] items-center border-b px-6">
//             <Link className="flex items-center gap-2 font-semibold" href="#">
//               <BarChart3 className="h-6 w-6" />
//               <span className="">Employer Dashboard</span>
//             </Link>
//           </div>
//           <div className="flex-1 overflow-auto py-2">
//             <nav className="grid items-start px-4 text-sm font-medium">
//               <Link
//                 className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
//                 href="#"
//               >
//                 <Home className="h-4 w-4" />
//                 Home
//               </Link>
//               <Link
//                 className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
//                 href="#"
//               >
//                 <FileText className="h-4 w-4" />
//                 Applications
//               </Link>
//               <Link
//                 className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
//                 href="#"
//               >
//                 <Users className="h-4 w-4" />
//                 Employees
//               </Link>
//             </nav>
//           </div>
//         </div>
//       </div>
//       <div className="flex flex-col">
//         <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6">
//           <Link className="lg:hidden" href="#">
//             <BarChart3 className="h-6 w-6" />
//             <span className="sr-only">Home</span>
//           </Link>
//           <h1 className="font-semibold text-lg">Dashboard</h1>
//         </header>
//         <main className="flex-1 overflow-auto">
//           <div className="container mx-auto p-4 md:p-6 lg:p-8">
//             <div className="grid gap-6">
//               <h2 className="text-3xl font-bold tracking-tight">Welcome back, Employer!</h2>
//               <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//                 <Card>
//                   <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                     <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
//                     <FileText className="h-4 w-4 text-muted-foreground" />
//                   </CardHeader>
//                   <CardContent>
//                     <div className="text-2xl font-bold">1,234</div>
//                   </CardContent>
//                 </Card>
//                 <Card>
//                   <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                     <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
//                     <Users className="h-4 w-4 text-muted-foreground" />
//                   </CardHeader>
//                   <CardContent>
//                     <div className="text-2xl font-bold">567</div>
//                   </CardContent>
//                 </Card>
//                 <Card>
//                   <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                     <CardTitle className="text-sm font-medium">Add New Category</CardTitle>
//                    
//                   </CardHeader>
//                   <CardContent>
//                     <Button className="w-full" variant="outline">
//                       Add Category
//                     </Button>
//                   </CardContent>
//                 </Card>
//                 <Card>
//                   <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                     <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
//                   </CardHeader>
//                   <CardContent className="grid gap-2">
//                     <Button className="w-full" variant="outline">
//                       View All Applications
//                     </Button>
//                     <Button className="w-full" variant="outline">
//                       View All Employees
//                     </Button>
//                   </CardContent>
//                 </Card>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }

