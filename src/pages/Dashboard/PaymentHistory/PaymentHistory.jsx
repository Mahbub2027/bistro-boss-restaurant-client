import { useContext } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { AuthContext } from "../../../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`)
            return res.data;
        }
    })
    return (
        <div className="w-10/12 mx-auto">
            <SectionTitle headings='Payment History' subtitles='At a Glance!'></SectionTitle>
            <h2 className="text-3xl">Total Payments: {payments.length}</h2>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="text-xl font-bold text-orange-600">
                        <tr >
                            <th>#</th>
                            <th >Price</th>
                            <th>Transcation Id</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        payments.map((payment, index)=> <tr key={payment._id} className="bg-base-100">
                            <th>{index + 1}</th>
                            <td>{payment.price}</td>
                            <td>{payment.transactionId}</td>
                            <td>{payment.status}</td>
                        </tr>)
                        }
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;