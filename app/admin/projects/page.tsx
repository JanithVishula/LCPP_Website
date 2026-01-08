'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Project {
  _id: string;
  title: string;
  date: string;
  description: string;
  category: string;
  year: string;
  participants?: number;
  pdfFileName: string;
  createdAt: string;
}

export default function AdminProjectsPage() {
  const { data: session, status } = useSession();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/login');
    }
    if (status === 'authenticated' && session?.user?.role !== 'admin') {
      redirect('/dashboard');
    }
    if (status === 'authenticated' && session?.user?.role === 'admin') {
      fetchProjects();
    }
  }, [status, session]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/projects/upload');
      if (response.ok) {
        const data = await response.json();
        setProjects(data.projects);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      setUploading(true);
      setMessage(null);

      const response = await fetch('/api/admin/projects/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Project created successfully with AI summary!' });
        fetchProjects();
        (e.target as HTMLFormElement).reset();
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to upload project' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while uploading' });
    } finally {
      setUploading(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gold mx-auto mb-4"></div>
          <p className="text-primary text-lg font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session || session.user.role !== 'admin') {
    return null;
  }

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary-light text-white rounded-2xl p-8 mb-8 shadow-xl">
            <h1 className="text-4xl font-bold mb-2">Admin - Project Management</h1>
            <p className="text-xl text-gold">Upload PDFs & Generate AI Summaries</p>
          </div>

          {/* Upload Form */}
          <div className="bg-white border-2 border-primary rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-primary mb-6">📄 Upload Project PDF</h2>
            
            {message && (
              <div className={`mb-6 p-4 rounded-lg ${
                message.type === 'success' 
                  ? 'bg-green-100 text-green-800 border border-green-300' 
                  : 'bg-red-100 text-red-800 border border-red-300'
              }`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleFileUpload} className="space-y-6">
              <div>
                <label className="block text-primary font-semibold mb-2">
                  Select PDF File
                </label>
                <input
                  type="file"
                  name="pdf"
                  accept=".pdf"
                  required
                  className="w-full px-4 py-3 border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                />
                <p className="text-sm text-gray-600 mt-2">
                  AI will automatically extract project details and create a summary
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-primary font-semibold mb-2">
                    Project Year
                  </label>
                  <select
                    name="year"
                    className="w-full px-4 py-3 border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                  >
                    <option value="2025-26">2025-26</option>
                    <option value="2024-25">2024-25</option>
                    <option value="2023-24">2023-24</option>
                  </select>
                </div>

                <div>
                  <label className="block text-primary font-semibold mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    className="w-full px-4 py-3 border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                  >
                    <option value="Community Service">Community Service</option>
                    <option value="Environmental">Environmental</option>
                    <option value="Educational">Educational</option>
                    <option value="Health & Wellness">Health & Wellness</option>
                    <option value="Fundraising">Fundraising</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="w-full bg-gold text-primary hover:bg-gold-dark font-bold py-4 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primary"></div>
                    Processing PDF with AI...
                  </span>
                ) : (
                  '🤖 Upload & Generate AI Summary'
                )}
              </button>
            </form>
          </div>

          {/* Projects List */}
          <div className="bg-white border-2 border-primary rounded-xl p-8">
            <h2 className="text-2xl font-bold text-primary mb-6">📋 Uploaded Projects ({projects.length})</h2>
            
            {projects.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg">No projects uploaded yet</p>
                <p>Upload your first PDF to get started!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project._id} className="border-2 border-gray-200 rounded-lg p-6 hover:border-gold transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-primary">{project.title}</h3>
                        <p className="text-sm text-gray-600">
                          📅 {new Date(project.date).toLocaleDateString()} • 
                          🏷️ {project.category} • 
                          📊 {project.year}
                        </p>
                      </div>
                      <span className="bg-gold text-primary px-3 py-1 rounded-full text-sm font-bold">
                        {project.participants || 0} Participants
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">{project.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>📄 {project.pdfFileName}</span>
                      <span>🕐 {new Date(project.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Back to Dashboard */}
          <div className="mt-8 text-center">
            <Link 
              href="/dashboard"
              className="inline-block bg-primary text-white hover:bg-primary-light font-bold py-3 px-8 rounded-lg transition-all duration-300"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
