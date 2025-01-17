import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  deleteSubmission,
  getSubmissions,
  updateSubmission,
} from "@/app/slices/submissionSlice";
import { Delete, Loader, Eye, EyeOff, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Redux state
  const { submissions, loading, error } = useSelector(
    (state: RootState) => state.submission
  );
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  useEffect(() => {
    if (!isAuthenticated) {
      const user = localStorage.getItem("user");
      if (!user) {
        navigate("/sign-in");
      }
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Fetch submissions on mount
    dispatch(getSubmissions());
  }, [dispatch]);

  const filteredSubmissions = submissions.filter(
    (submission) =>
      submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSeenStatus = (id: string) => {
    dispatch(updateSubmission(id));
  };

  const deleteSub = (id: string) => {
    dispatch(deleteSubmission(id));
  };

  const refreshSubmissions = () => {
    dispatch(getSubmissions());
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-10">
      <div className="flex justify-between flex-col md:flex-row">
        <h1 className="text-3xl font-bold mb-6">Leads Dashboard</h1>
        <div className="mb-4 flex space-x-2">
          <Input
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="min-w-72"
          />
          <Button
            size="icon"
            variant="outline"
            onClick={refreshSubmissions}
            title="Refresh submissions">
            <RefreshCw size={16} />
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Qualification</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredSubmissions.map((submission) => (
            <TableRow key={submission._id}>
              <TableCell>{submission.name}</TableCell>
              <TableCell>{submission.email}</TableCell>
              <TableCell>{submission.phonenumber}</TableCell>
              <TableCell>{submission.service}</TableCell>
              <TableCell>{submission.message}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleSeenStatus(submission._id)}>
                    {submission.isRead ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteSub(submission._id)}>
                    <Delete size={16} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
