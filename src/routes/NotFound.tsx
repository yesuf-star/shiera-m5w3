import { Link } from "react-router";
import { AlertCircle, ArrowLeft } from "lucide-react";

interface NotFoundProps {
  title?: string;
  message?: string;
}

export default function NotFound({
  title = "Page not found",
  message = "The page or product you are looking for does not exist.",
}: NotFoundProps) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <div className="mb-5 rounded-full bg-red-100 p-5 text-red-600">
        <AlertCircle size={36} />
      </div>

      <h1 className="text-2xl font-bold text-gray-900">
        {title}
      </h1>

      <p className="mt-2 max-w-md text-gray-500">
        {message}
      </p>

      <Link
        to="/"
        className="mt-6 flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        <ArrowLeft size={18} />
        Back to products
      </Link>
    </div>
  );
}