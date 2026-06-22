import React, { useState, useEffect } from 'react';
import { loadBlogs } from '../utils/blogLoader';
import type { BlogArticle, BlogSection } from '../data/blogArticles';
import SEO from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';
import { 
  Lock, LogOut, Plus, Trash2, Edit2, Download, Upload, 
  ArrowUp, ArrowDown, Check, AlertCircle, Eye, FileText, 
  Settings, Sparkles, ChevronRight, HelpCircle
} from 'lucide-react';

const PREDEFINED_CATEGORIES = [
  'Web Design', 'SEO', 'Google Ads', 'Meta Ads', 'Ecommerce', 
  'Business Automation', 'Hosting', 'SaaS', 'UK Business Growth'
];

export default function AdminPage() {
  
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Blog states
  const [blogs, setBlogs] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'list' | 'editor'>('list');
  const [editingBlog, setEditingBlog] = useState<BlogArticle | null>(null);
  const [isNewPost, setIsNewPost] = useState(false);

  // Editor form state
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('Web Design');
  const [excerpt, setExcerpt] = useState('');
  const [date, setDate] = useState('');
  const [author, setAuthor] = useState('Mehar');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [schemaText, setSchemaText] = useState('');
  const [markdownContent, setMarkdownContent] = useState('');
  const [sections, setSections] = useState<BlogSection[]>([]);
  const [editorMode, setEditorMode] = useState<'visual' | 'markdown'>('markdown');

  // UI Feedback
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [saveMessage, setSaveMessage] = useState('');

  // Check login on load
  useEffect(() => {
    const savedToken = localStorage.getItem('digioverse_admin_token');
    if (savedToken === 'digioverseadmin2026') {
      setIsAuthenticated(true);
      fetchBlogs();
    } else {
      setLoading(false);
    }
  }, []);

  // Fetch blogs from server or static fallback
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const data = await loadBlogs();
      setBlogs(data);
    } catch (err) {
      console.error('Error loading blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'digioverseadmin2026') {
      setIsAuthenticated(true);
      setLoginError('');
      localStorage.setItem('digioverse_admin_token', password);
      fetchBlogs();
    } else {
      setLoginError('Invalid administrator password.');
    }
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('digioverse_admin_token');
    setIsAuthenticated(false);
    setBlogs([]);
  };

  // Helpers for markdown parsing and formatting
  const parseMarkdownToSections = (md: string): BlogSection[] => {
    const parsedSections: BlogSection[] = [];
    const lines = md.split('\n');
    let currentListItems: string[] = [];
    let currentTableHeaders: string[] = [];
    let currentTableRows: string[][] = [];
    let isTable = false;

    const flushList = () => {
      if (currentListItems.length > 0) {
        parsedSections.push({ type: 'list', items: [...currentListItems] });
        currentListItems = [];
      }
    };

    const flushTable = () => {
      if (isTable) {
        if (currentTableHeaders.length > 0 || currentTableRows.length > 0) {
          parsedSections.push({
            type: 'table',
            headers: currentTableHeaders,
            rows: currentTableRows
          });
        }
        currentTableHeaders = [];
        currentTableRows = [];
        isTable = false;
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Table parsing
      if (line.startsWith('|')) {
        flushList();
        isTable = true;
        const parts = line.split('|').map(p => p.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
        if (parts.every(p => /^:?-+:?$/.test(p))) {
          continue; // skip separator line
        }
        if (currentTableHeaders.length === 0 && currentTableRows.length === 0) {
          currentTableHeaders = parts;
        } else {
          currentTableRows.push(parts);
        }
        continue;
      } else {
        flushTable();
      }

      if (line.startsWith('## ')) {
        flushList();
        parsedSections.push({ type: 'heading-2', content: line.substring(3).trim() });
      } else if (line.startsWith('### ')) {
        flushList();
        parsedSections.push({ type: 'heading-3', content: line.substring(4).trim() });
      } else if (line.startsWith('> ')) {
        flushList();
        const quoteContent = line.substring(2).trim();
        if (quoteContent.startsWith('💡') || quoteContent.startsWith('⚡') || quoteContent.startsWith('ℹ️') || quoteContent.startsWith('⚠️')) {
          parsedSections.push({ type: 'callout', content: quoteContent });
        } else {
          parsedSections.push({ type: 'quote', content: quoteContent });
        }
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        currentListItems.push(line.substring(2).trim());
      } else if (line === '') {
        flushList();
      } else {
        flushList();
        parsedSections.push({ type: 'paragraph', content: line });
      }
    }

    flushList();
    flushTable();

    return parsedSections;
  };

  const formatSectionsToMarkdown = (secList: BlogSection[]): string => {
    return secList.map(sec => {
      switch (sec.type) {
        case 'heading-2':
          return `## ${sec.content}`;
        case 'heading-3':
          return `### ${sec.content}`;
        case 'paragraph':
          return sec.content || '';
        case 'quote':
          return `> ${sec.content}`;
        case 'callout':
          return `> ${sec.content}`;
        case 'list':
          return sec.items?.map(item => `- ${item}`).join('\n') || '';
        case 'table': {
          const hdrs = `| ${sec.headers?.join(' | ') || ''} |`;
          const separators = `| ${sec.headers?.map(() => '---').join(' | ') || ''} |`;
          const rws = sec.rows?.map(row => `| ${row.join(' | ')} |`).join('\n') || '';
          return `${hdrs}\n${separators}\n${rws}`;
        }
        default:
          return '';
      }
    }).join('\n\n');
  };

  // Convert "15 Jun 2026" to "2026-06-15" ISO date format
  const formatDateToISO = (dateStr: string): string => {
    const months: Record<string, string> = {
      Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
      Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
    };
    const parts = dateStr.trim().split(/\s+/);
    if (parts.length === 3) {
      const day = parts[0].padStart(2, '0');
      const monthName = parts[1].substring(0, 3);
      const month = months[monthName] || '01';
      const year = parts[2];
      return `${year}-${month}-${day}`;
    }
    return new Date().toISOString().split('T')[0];
  };

  // Auto generate standard JSON-LD schema
  const generateSchema = (customSlug: string, customTitle: string, customExcerpt: string, customAuthor: string, customDate: string) => {
    const isoDate = formatDateToISO(customDate);
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": customTitle,
      "description": customExcerpt,
      "author": {
        "@type": "Person",
        "name": customAuthor
      },
      "publisher": {
        "@type": "Organization",
        "name": "Digioverse LTD",
        "logo": {
          "@type": "ImageObject",
          "url": "https://digioverse.com/assets/digioverse-logo.png"
        }
      },
      "datePublished": isoDate,
      "mainEntityOfPage": `https://digioverse.com/blog/${customSlug}`
    };
  };

  // Calculate read time based on word count
  const calculateReadTime = (text: string): string => {
    const wordCount = text.split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(wordCount / 200));
    return `${minutes} min`;
  };

  // Initialize form for adding a new blog
  const handleNewBlog = () => {
    const today = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formattedDate = `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;

    setEditingBlog(null);
    setIsNewPost(true);
    setTitle('');
    setSlug('');
    setCategory('Web Design');
    setExcerpt('');
    setDate(formattedDate);
    setAuthor('Mehar');
    setMetaTitle('');
    setMetaDescription('');
    setKeywords('');
    setMarkdownContent('');
    setSections([]);
    setSchemaText(JSON.stringify(generateSchema('', '', '', 'Mehar', formattedDate), null, 2));
    setEditorMode('markdown');
    setActiveTab('editor');
  };

  // Initialize form for editing an existing blog
  const handleEditBlog = (blog: BlogArticle) => {
    setEditingBlog(blog);
    setIsNewPost(false);
    setTitle(blog.title);
    setSlug(blog.slug);
    setCategory(blog.category);
    setExcerpt(blog.excerpt);
    setDate(blog.date);
    setAuthor(blog.author);
    setMetaTitle(blog.metaTitle);
    setMetaDescription(blog.metaDescription);
    setKeywords(blog.keywords);
    setSections(blog.content);
    setMarkdownContent(formatSectionsToMarkdown(blog.content));
    setSchemaText(JSON.stringify(blog.schema, null, 2));
    setEditorMode('markdown');
    setActiveTab('editor');
  };

  // Generate slug based on Title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (isNewPost || !slug) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      setSlug(generatedSlug);
    }
  };

  // Sync title & excerpt changes to automatically refresh the SEO preview & Schema.org structure
  useEffect(() => {
    if (activeTab === 'editor') {
      try {
        const currentSchema = JSON.parse(schemaText);
        currentSchema.headline = title;
        currentSchema.description = excerpt;
        currentSchema.mainEntityOfPage = `https://digioverse.com/blog/${slug}`;
        currentSchema.author.name = author;
        currentSchema.datePublished = formatDateToISO(date);
        setSchemaText(JSON.stringify(currentSchema, null, 2));
      } catch (e) {
        // if user has invalid schema text, don't crash
      }
    }
  }, [title, slug, excerpt, author, date, activeTab]);

  // Handle section edits inside the visual list builder
  const updateSectionContent = (index: number, newContent: string) => {
    const updated = [...sections];
    updated[index].content = newContent;
    setSections(updated);
    setMarkdownContent(formatSectionsToMarkdown(updated));
  };

  const addVisualSection = (type: BlogSection['type']) => {
    const newSec: BlogSection = { type };
    if (type === 'list') {
      newSec.items = ['New list item'];
    } else if (type === 'table') {
      newSec.headers = ['Header 1', 'Header 2'];
      newSec.rows = [['Row 1 Cell 1', 'Row 1 Cell 2']];
    } else {
      newSec.content = '';
    }
    const updated = [...sections, newSec];
    setSections(updated);
    setMarkdownContent(formatSectionsToMarkdown(updated));
  };

  const removeSection = (index: number) => {
    const updated = sections.filter((_, idx) => idx !== index);
    setSections(updated);
    setMarkdownContent(formatSectionsToMarkdown(updated));
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === sections.length - 1) return;
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    const updated = [...sections];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setSections(updated);
    setMarkdownContent(formatSectionsToMarkdown(updated));
  };

  // Sync editors when switching tabs
  const handleEditorModeToggle = (mode: 'visual' | 'markdown') => {
    if (mode === 'visual') {
      // compile markdown input back into block list
      setSections(parseMarkdownToSections(markdownContent));
    } else {
      // compile block list back into markdown string
      setMarkdownContent(formatSectionsToMarkdown(sections));
    }
    setEditorMode(mode);
  };

  // Save changes to cPanel server
  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('saving');
    setSaveMessage('Uploading payload...');

    // Synchronize sections
    let finalSections = sections;
    if (editorMode === 'markdown') {
      finalSections = parseMarkdownToSections(markdownContent);
    }

    // Check schema is valid JSON
    let parsedSchema = {};
    try {
      parsedSchema = JSON.parse(schemaText);
    } catch (err) {
      setSaveStatus('error');
      setSaveMessage('Failed: Schema field is not a valid JSON structure.');
      return;
    }

    if (!slug) {
      setSaveStatus('error');
      setSaveMessage('Failed: Slug is required.');
      return;
    }

    // Validate title and author initials
    const initials = author.split(/\s+/).map(w => w[0]).join('').toUpperCase().substring(0, 2) || 'ME';
    const finalReadTime = calculateReadTime(markdownContent || formatSectionsToMarkdown(finalSections));

    const updatedBlog: BlogArticle = {
      slug,
      title,
      category,
      excerpt,
      date,
      readTime: finalReadTime,
      author,
      initials,
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || excerpt,
      keywords,
      schema: parsedSchema,
      content: finalSections
    };

    // Merge new/modified article into current array list
    let updatedBlogsList: BlogArticle[] = [];
    if (isNewPost) {
      // check duplicates
      if (blogs.some(b => b.slug === slug)) {
        setSaveStatus('error');
        setSaveMessage(`Failed: A blog post with slug "${slug}" already exists.`);
        return;
      }
      updatedBlogsList = [updatedBlog, ...blogs];
    } else {
      updatedBlogsList = blogs.map(b => b.slug === editingBlog?.slug ? updatedBlog : b);
    }

    try {
      const response = await fetch('/save_blogs.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Password': 'digioverseadmin2026'
        },
        body: JSON.stringify(updatedBlogsList)
      });

      if (response.ok) {
        setBlogs(updatedBlogsList);
        setSaveStatus('success');
        setSaveMessage('Blog post published successfully!');
        setTimeout(() => {
          setActiveTab('list');
          setSaveStatus('idle');
        }, 1500);
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Server rejected request');
      }
    } catch (err: any) {
      console.error(err);
      setSaveStatus('error');
      setSaveMessage(`Failed to publish: ${err.message || 'Check your permissions.'}`);
    }
  };

  // Delete article
  const handleDeleteBlog = async (targetSlug: string) => {
    const confirmation = window.confirm('Are you absolutely sure you want to delete this blog post? This action cannot be undone.');
    if (!confirmation) return;

    setLoading(true);
    const updatedBlogsList = blogs.filter(b => b.slug !== targetSlug);

    try {
      const response = await fetch('/save_blogs.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Password': 'digioverseadmin2026'
        },
        body: JSON.stringify(updatedBlogsList)
      });

      if (response.ok) {
        setBlogs(updatedBlogsList);
        alert('Blog post deleted successfully.');
      } else {
        throw new Error('Could not delete.');
      }
    } catch (err: any) {
      alert(`Delete failed: ${err.message || 'Server connection error.'}`);
    } finally {
      setLoading(false);
    }
  };

  // Backup Export: Download current blogs as JSON file
  const handleBackupExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(blogs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `digioverse_blogs_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Backup Import: Upload and replace/merge blogs JSON
  const handleBackupImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = async (event) => {
      try {
        const result = event.target?.result;
        if (typeof result !== 'string') return;
        const parsed = JSON.parse(result);
        if (!Array.isArray(parsed)) {
          alert('Invalid file format: Backup must be a JSON array of blogs.');
          return;
        }

        const confirmMerge = window.confirm(`Found ${parsed.length} blog posts in backup. Do you want to overwrite all live blogs with this list?`);
        if (!confirmMerge) return;

        setLoading(true);
        const response = await fetch('/save_blogs.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Admin-Password': 'digioverseadmin2026'
          },
          body: JSON.stringify(parsed)
        });

        if (response.ok) {
          setBlogs(parsed);
          alert('Backup restored successfully!');
        } else {
          throw new Error('Failed to save to server.');
        }
      } catch (err: any) {
        alert(`Restore failed: ${err.message || 'Invalid JSON file structure.'}`);
      } finally {
        setLoading(false);
      }
    };
    fileReader.readAsText(file);
  };

  if (!isAuthenticated) {
    return (
      <>
        <SEO title="Admin Login | Digioverse" description="Secure portal access." />
        <div className="min-h-screen bg-[#0a0518] flex items-center justify-center px-5 font-['Outfit'] relative overflow-hidden">
          {/* Animated Background Gradients */}
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#6a00ff]/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#3b0a75]/25 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="w-full max-w-[460px] bg-[#130d25]/60 border border-white/5 p-8 md:p-10 rounded-[28px] shadow-[0_15px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl animate-[fadeIn_0.4s_ease]">
            <div className="text-center mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-[#6a00ff] to-[#3b0a75] rounded-2xl flex items-center justify-center mx-auto shadow-[0_8px_24px_rgba(106,0,255,0.3)]">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white font-['Plus_Jakarta_Sans'] mt-5">Digioverse Administrator</h1>
              <p className="text-xs text-[#7d718c] mt-2">Enter credentials to access the SEO Blog Control Panel</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#c7a7ff] mb-2">Security Passcode</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/20 focus:border-[#6a00ff] focus:bg-white/10 transition-all outline-none"
                />
              </div>

              {loginError && (
                <div className="bg-red-900/25 border border-red-500/30 text-red-300 text-xs px-4 py-3 rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#6a00ff] hover:bg-[#3b0a75] text-white text-sm font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_8px_20px_rgba(106,0,255,0.25)] mt-2"
              >
                Access Dashboard <ChevronRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO title="Admin Blog Dashboard | Digioverse" description="Add, edit, and publish blogs dynamic loader system." />

      <div className="min-h-screen bg-[#f7f7fa] pt-32 pb-24 font-['Outfit']">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#ddd0f4]/60 pb-8 mb-8">
            <div>
              <Breadcrumb current="Admin Panel" />
              <h1 className="text-3xl md:text-4xl font-bold text-[#0d0520] font-['Plus_Jakarta_Sans'] mt-2 tracking-tight">
                SEO & Blog Control Panel
              </h1>
              <p className="text-sm text-[#7d718c] mt-1.5 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                Logged in as Admin. Updates render live on cPanel instantly.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleBackupExport}
                className="bg-white border border-[#ddd0f4] hover:border-[#6a00ff] hover:text-[#6a00ff] text-xs font-bold text-[#53445f] py-2.5 px-4 rounded-xl flex items-center gap-1.5 transition-all"
                title="Save backup of all current blog posts locally"
              >
                <Download className="w-3.5 h-3.5" /> Export Backup
              </button>
              
              <label className="bg-white border border-[#ddd0f4] hover:border-[#6a00ff] hover:text-[#6a00ff] text-xs font-bold text-[#53445f] py-2.5 px-4 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer">
                <Upload className="w-3.5 h-3.5" /> Import Backup
                <input type="file" accept=".json" onChange={handleBackupImport} className="hidden" />
              </label>

              <button
                onClick={handleLogout}
                className="bg-red-50 hover:bg-red-100 border border-red-200 text-xs font-bold text-red-600 py-2.5 px-4 rounded-xl flex items-center gap-1.5 transition-all"
              >
                <LogOut className="w-3.5 h-3.5" /> Logout
              </button>
            </div>
          </div>

          {loading ? (
            <div className="py-20 text-center">
              <div className="w-10 h-10 rounded-full border-2 border-[#ddd0f4]/45 border-t-[#6a00ff] animate-spin mx-auto mb-4" />
              <p className="text-sm text-[#7d718c] font-semibold">Updating server records...</p>
            </div>
          ) : activeTab === 'list' ? (
            /* BLOG ARTICLES LIST TAB */
            <div className="animate-[fadeIn_0.3s_ease]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-[#0d0520] font-['Plus_Jakarta_Sans']">
                  Published Articles ({blogs.length})
                </h2>
                <button
                  onClick={handleNewBlog}
                  className="bg-[#6a00ff] hover:bg-[#3b0a75] text-white text-xs font-bold py-3 px-5 rounded-xl flex items-center gap-1.5 transition-all shadow-[0_6px_16px_rgba(106,0,255,0.15)]"
                >
                  <Plus className="w-4 h-4" /> Add New Blog Post
                </button>
              </div>

              <div className="bg-white border border-[#ddd0f4]/55 rounded-3xl shadow-[0_4px_30px_rgba(13,5,32,0.02)] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#f7f7fa] border-b border-[#ddd0f4]/60 text-[#7d718c] text-xs font-bold uppercase tracking-wider">
                        <th className="p-5">Title</th>
                        <th className="p-5">Category</th>
                        <th className="p-5">Date</th>
                        <th className="p-5">Read Time</th>
                        <th className="p-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {blogs.map((b) => (
                        <tr key={b.slug} className="border-b border-[#ddd0f4]/40 hover:bg-[#eee7ff]/10 transition-colors">
                          <td className="p-5">
                            <div className="font-semibold text-[#0d0520] text-sm line-clamp-1">{b.title}</div>
                            <div className="text-[11px] text-[#7d718c] font-mono mt-0.5">/blog/{b.slug}</div>
                          </td>
                          <td className="p-5">
                            <span className="text-xs font-semibold text-[#6a00ff] bg-[#eee7ff] px-2.5 py-1 rounded-full">
                              {b.category}
                            </span>
                          </td>
                          <td className="p-5 text-[#53445f] text-xs">{b.date}</td>
                          <td className="p-5 text-[#53445f] text-xs">{b.readTime}</td>
                          <td className="p-5 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <a
                                href={`/blog/${b.slug}`}
                                target="_blank"
                                rel="noreferrer"
                                className="bg-white border border-[#ddd0f4] hover:border-[#6a00ff] hover:text-[#6a00ff] p-2 rounded-lg text-[#53445f] transition-all"
                                title="View live page"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </a>
                              <button
                                onClick={() => handleEditBlog(b)}
                                className="bg-white border border-[#ddd0f4] hover:border-[#6a00ff] hover:text-[#6a00ff] p-2 rounded-lg text-[#53445f] transition-all"
                                title="Edit article"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteBlog(b.slug)}
                                className="bg-red-50 border border-red-100 hover:bg-red-100 hover:border-red-200 p-2 rounded-lg text-red-600 transition-all"
                                title="Delete article"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {blogs.length === 0 && (
                        <tr>
                          <td colSpan={5} className="p-10 text-center text-[#7d718c]">
                            No blogs loaded yet. Click 'Add New' to construct your first article!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            /* BLOG EDITOR TAB */
            <form onSubmit={handleSaveBlog} className="space-y-8 animate-[fadeIn_0.3s_ease]">
              <div className="flex items-center justify-between border-b border-[#ddd0f4]/60 pb-5">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#6a00ff] bg-[#eee7ff] px-3 py-1 rounded-full">
                    {isNewPost ? 'Adding New Post' : 'Modifying Post'}
                  </span>
                  {!isNewPost && editingBlog && (
                    <span className="text-xs text-[#7d718c] font-mono">Original Slug: {editingBlog.slug}</span>
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('list')}
                    className="bg-white border border-[#ddd0f4] hover:bg-[#f7f7fa] text-xs font-bold text-[#53445f] py-2.5 px-5 rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saveStatus === 'saving'}
                    className="bg-[#6a00ff] hover:bg-[#3b0a75] text-white text-xs font-bold py-2.5 px-6 rounded-xl flex items-center gap-1.5 transition-all shadow-[0_6px_16px_rgba(106,0,255,0.15)]"
                  >
                    {saveStatus === 'saving' ? 'Publishing...' : 'Publish Article'}
                  </button>
                </div>
              </div>

              {saveStatus !== 'idle' && (
                <div className={`p-4 rounded-2xl border flex items-center gap-3 ${
                  saveStatus === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
                  saveStatus === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
                  'bg-purple-50 border-purple-200 text-purple-800 animate-pulse'
                }`}>
                  {saveStatus === 'success' && <Check className="w-5 h-5 text-green-600 shrink-0" />}
                  {saveStatus === 'error' && <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />}
                  <div className="text-sm font-semibold">{saveMessage}</div>
                </div>
              )}

              <div className="grid lg:grid-cols-[64%_34%] gap-8 items-start">
                
                {/* LEFT COL: Core Post details */}
                <div className="space-y-6">
                  {/* General Config Card */}
                  <div className="bg-white rounded-3xl border border-[#ddd0f4]/55 p-6 md:p-8 space-y-5 shadow-[0_4px_35px_rgba(13,5,32,0.01)]">
                    <h3 className="text-base font-bold text-[#0d0520] border-b border-[#ddd0f4]/50 pb-3 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#6a00ff]" /> Article Metadata
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="col-span-2">
                        <label className="block text-xs font-bold text-[#2b094f] mb-1.5">Article Title *</label>
                        <input
                          type="text"
                          required
                          value={title}
                          onChange={handleTitleChange}
                          placeholder="e.g. How Much Does a Website Cost in the UK? (2026 Price Guide)"
                          className="w-full bg-[#f7f7fa] border border-[#ddd0f4] rounded-xl px-4 py-3 text-sm text-[#0d0520] placeholder:text-[#7d718c]/50 focus:border-[#6a00ff] focus:bg-white transition-all outline-none font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#2b094f] mb-1.5">Route URL Slug *</label>
                        <input
                          type="text"
                          required
                          value={slug}
                          onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                          placeholder="e.g. website-cost-uk-price-guide"
                          className="w-full bg-[#f7f7fa] border border-[#ddd0f4] rounded-xl px-4 py-3 text-sm text-[#0d0520] focus:border-[#6a00ff] focus:bg-white transition-all outline-none font-mono"
                        />
                        <span className="text-[10px] text-[#7d718c] mt-1 block">Live URL: https://digioverse.com/blog/{slug || 'slug'}</span>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#2b094f] mb-1.5">Category *</label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full bg-[#f7f7fa] border border-[#ddd0f4] rounded-xl px-4 py-3 text-sm text-[#0d0520] focus:border-[#6a00ff] focus:bg-white transition-all outline-none font-medium"
                        >
                          {PREDEFINED_CATEGORIES.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#2b094f] mb-1.5">Publish Date</label>
                        <input
                          type="text"
                          required
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          placeholder="e.g. 15 Jun 2026"
                          className="w-full bg-[#f7f7fa] border border-[#ddd0f4] rounded-xl px-4 py-3 text-sm text-[#0d0520] focus:border-[#6a00ff] focus:bg-white transition-all outline-none font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#2b094f] mb-1.5">Author</label>
                        <input
                          type="text"
                          required
                          value={author}
                          onChange={(e) => setAuthor(e.target.value)}
                          placeholder="Author Name"
                          className="w-full bg-[#f7f7fa] border border-[#ddd0f4] rounded-xl px-4 py-3 text-sm text-[#0d0520] focus:border-[#6a00ff] focus:bg-white transition-all outline-none font-medium"
                        />
                      </div>

                      <div className="col-span-2">
                        <label className="block text-xs font-bold text-[#2b094f] mb-1.5">Card Excerpt / Intro Summary *</label>
                        <textarea
                          required
                          value={excerpt}
                          onChange={(e) => setExcerpt(e.target.value)}
                          rows={3}
                          placeholder="Short summary displayed on list cards and in metadata (140-160 characters suggested)."
                          className="w-full bg-[#f7f7fa] border border-[#ddd0f4] rounded-xl p-4 text-sm text-[#0d0520] placeholder:text-[#7d718c]/50 focus:border-[#6a00ff] focus:bg-white transition-all outline-none font-medium resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Body Content Editor Card */}
                  <div className="bg-white rounded-3xl border border-[#ddd0f4]/55 p-6 md:p-8 space-y-6 shadow-[0_4px_35px_rgba(13,5,32,0.01)]">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#ddd0f4]/50 pb-3 gap-4">
                      <h3 className="text-base font-bold text-[#0d0520] flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#6a00ff]" /> Article Content
                      </h3>
                      
                      <div className="flex bg-[#f7f7fa] border border-[#ddd0f4] p-1 rounded-xl w-fit">
                        <button
                          type="button"
                          onClick={() => handleEditorModeToggle('markdown')}
                          className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                            editorMode === 'markdown' ? 'bg-[#6a00ff] text-white' : 'text-[#7d718c] hover:text-[#6a00ff]'
                          }`}
                        >
                          Markdown Editor
                        </button>
                        <button
                          type="button"
                          onClick={() => handleEditorModeToggle('visual')}
                          className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                            editorMode === 'visual' ? 'bg-[#6a00ff] text-white' : 'text-[#7d718c] hover:text-[#6a00ff]'
                          }`}
                        >
                          Visual Blocks
                        </button>
                      </div>
                    </div>

                    {editorMode === 'markdown' ? (
                      /* Markdown Editor View */
                      <div className="space-y-4">
                        <div className="bg-purple-50/50 border border-[#ddd0f4] rounded-2xl p-4 text-xs text-[#53445f] leading-relaxed">
                          <p className="font-bold text-[#6a00ff] flex items-center gap-1"><HelpCircle className="w-3.5 h-3.5" /> Markdown Quick Tips</p>
                          <ul className="list-disc pl-4 mt-1.5 space-y-1">
                            <li>Use <code className="font-mono text-purple-700 font-semibold">## Heading 2</code> and <code className="font-mono text-purple-700 font-semibold">### Heading 3</code> for headings.</li>
                            <li>Surround words with <code className="font-mono text-purple-700 font-semibold">**bold**</code> to bold them inside paragraphs or list elements.</li>
                            <li>Use <code className="font-mono text-purple-700 font-semibold">&gt; 💡 Note text</code> or <code className="font-mono text-purple-700 font-semibold">&gt; Quote text</code> for callouts or quotes.</li>
                            <li>Format lists with <code className="font-mono text-purple-700 font-semibold">- item</code>. Columns and rows on tables are formatted with pipelines <code className="font-mono text-purple-700 font-semibold">|</code>.</li>
                          </ul>
                        </div>
                        <textarea
                          value={markdownContent}
                          onChange={(e) => setMarkdownContent(e.target.value)}
                          rows={20}
                          placeholder="Start drafting your article in clean Markdown..."
                          className="w-full bg-[#f7f7fa] border border-[#ddd0f4] rounded-xl p-4 text-sm text-[#0d0520] placeholder:text-[#7d718c]/40 focus:border-[#6a00ff] focus:bg-white transition-all outline-none font-mono resize-y"
                        />
                      </div>
                    ) : (
                      /* Visual block builder */
                      <div className="space-y-4">
                        <div className="space-y-3">
                          {sections.map((sec, index) => (
                            <div key={index} className="border border-[#ddd0f4] rounded-2xl p-4 bg-[#f7f7fa] relative group">
                              <div className="absolute right-3 top-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  type="button"
                                  onClick={() => moveSection(index, 'up')}
                                  disabled={index === 0}
                                  className="p-1 border border-[#ddd0f4] bg-white rounded hover:text-[#6a00ff] disabled:opacity-30 disabled:hover:text-[#7d718c]"
                                  title="Move Up"
                                >
                                  <ArrowUp className="w-3 h-3" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => moveSection(index, 'down')}
                                  disabled={index === sections.length - 1}
                                  className="p-1 border border-[#ddd0f4] bg-white rounded hover:text-[#6a00ff] disabled:opacity-30 disabled:hover:text-[#7d718c]"
                                  title="Move Down"
                                >
                                  <ArrowDown className="w-3 h-3" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => removeSection(index)}
                                  className="p-1 border border-red-200 bg-red-50 hover:bg-red-100 rounded text-red-600"
                                  title="Delete Block"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>

                              <span className="text-[10px] uppercase font-bold tracking-wider text-[#6a00ff] bg-purple-100 px-2 py-0.5 rounded-md">
                                {sec.type}
                              </span>

                              <div className="mt-3">
                                {sec.type === 'list' ? (
                                  <div className="space-y-2">
                                    {sec.items?.map((item, i) => (
                                      <input
                                        key={i}
                                        type="text"
                                        value={item}
                                        onChange={(e) => {
                                          const itemsCopy = [...(sec.items || [])];
                                          itemsCopy[i] = e.target.value;
                                          const updated = [...sections];
                                          updated[index].items = itemsCopy;
                                          setSections(updated);
                                          setMarkdownContent(formatSectionsToMarkdown(updated));
                                        }}
                                        className="w-full bg-white border border-[#ddd0f4] rounded-lg px-3 py-2 text-sm text-[#0d0520]"
                                      />
                                    ))}
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const itemsCopy = [...(sec.items || []), 'New list item'];
                                        const updated = [...sections];
                                        updated[index].items = itemsCopy;
                                        setSections(updated);
                                        setMarkdownContent(formatSectionsToMarkdown(updated));
                                      }}
                                      className="text-xs font-bold text-[#6a00ff] hover:text-[#3b0a75]"
                                    >
                                      + Add list item
                                    </button>
                                  </div>
                                ) : sec.type === 'table' ? (
                                  <div className="text-xs text-[#7d718c]">
                                    Table headers and rows: edit using <strong>Markdown Editor</strong> tab for easier formatting!
                                  </div>
                                ) : (
                                  <textarea
                                    value={sec.content || ''}
                                    onChange={(e) => updateSectionContent(index, e.target.value)}
                                    rows={sec.type.startsWith('heading') ? 1 : 4}
                                    placeholder={`Enter content for ${sec.type}`}
                                    className="w-full bg-white border border-[#ddd0f4] rounded-xl p-3 text-sm text-[#0d0520]"
                                  />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-2 border-t border-[#ddd0f4]/60 pt-4">
                          <button type="button" onClick={() => addVisualSection('paragraph')} className="bg-[#f7f7fa] hover:bg-[#eee7ff] border border-[#ddd0f4] text-xs font-bold text-[#53445f] py-2 px-3.5 rounded-lg transition-all">+ Paragraph</button>
                          <button type="button" onClick={() => addVisualSection('heading-2')} className="bg-[#f7f7fa] hover:bg-[#eee7ff] border border-[#ddd0f4] text-xs font-bold text-[#53445f] py-2 px-3.5 rounded-lg transition-all">+ Heading 2</button>
                          <button type="button" onClick={() => addVisualSection('heading-3')} className="bg-[#f7f7fa] hover:bg-[#eee7ff] border border-[#ddd0f4] text-xs font-bold text-[#53445f] py-2 px-3.5 rounded-lg transition-all">+ Heading 3</button>
                          <button type="button" onClick={() => addVisualSection('list')} className="bg-[#f7f7fa] hover:bg-[#eee7ff] border border-[#ddd0f4] text-xs font-bold text-[#53445f] py-2 px-3.5 rounded-lg transition-all">+ List</button>
                          <button type="button" onClick={() => addVisualSection('quote')} className="bg-[#f7f7fa] hover:bg-[#eee7ff] border border-[#ddd0f4] text-xs font-bold text-[#53445f] py-2 px-3.5 rounded-lg transition-all">+ Quote</button>
                          <button type="button" onClick={() => addVisualSection('callout')} className="bg-[#f7f7fa] hover:bg-[#eee7ff] border border-[#ddd0f4] text-xs font-bold text-[#53445f] py-2 px-3.5 rounded-lg transition-all">+ Callout</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* RIGHT COL: SEO Details & JSON-LD Schema */}
                <div className="space-y-6">
                  {/* SEO Configuration Card */}
                  <div className="bg-white rounded-3xl border border-[#ddd0f4]/55 p-6 space-y-4 shadow-[0_4px_35px_rgba(13,5,32,0.01)]">
                    <h3 className="text-base font-bold text-[#0d0520] border-b border-[#ddd0f4]/50 pb-3 flex items-center gap-2">
                      <Settings className="w-4 h-4 text-[#6a00ff]" /> SEO Configuration
                    </h3>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-xs font-bold text-[#2b094f]">Meta Title</label>
                        <span className={`text-[10px] font-bold ${metaTitle.length > 60 || metaTitle.length < 50 ? 'text-amber-600' : 'text-green-600'}`}>
                          {metaTitle.length} / 60
                        </span>
                      </div>
                      <input
                        type="text"
                        value={metaTitle}
                        onChange={(e) => setMetaTitle(e.target.value)}
                        placeholder={title}
                        className="w-full bg-[#f7f7fa] border border-[#ddd0f4] rounded-xl px-4 py-2.5 text-xs text-[#0d0520] focus:border-[#6a00ff] focus:bg-white transition-all outline-none font-medium"
                      />
                      <span className="text-[9px] text-[#7d718c] mt-0.5 block">Recommended length: 50-60 characters.</span>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-xs font-bold text-[#2b094f]">Meta Description</label>
                        <span className={`text-[10px] font-bold ${metaDescription.length > 160 || metaDescription.length < 140 ? 'text-amber-600' : 'text-green-600'}`}>
                          {metaDescription.length} / 160
                        </span>
                      </div>
                      <textarea
                        value={metaDescription}
                        onChange={(e) => setMetaDescription(e.target.value)}
                        rows={3}
                        placeholder={excerpt}
                        className="w-full bg-[#f7f7fa] border border-[#ddd0f4] rounded-xl p-3 text-xs text-[#0d0520] focus:border-[#6a00ff] focus:bg-white transition-all outline-none font-medium resize-none"
                      />
                      <span className="text-[9px] text-[#7d718c] mt-0.5 block">Recommended length: 140-160 characters.</span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2b094f] mb-1.5">Focus Keywords</label>
                      <input
                        type="text"
                        value={keywords}
                        onChange={(e) => setKeywords(e.target.value)}
                        placeholder="e.g. web design cost, price guide uk"
                        className="w-full bg-[#f7f7fa] border border-[#ddd0f4] rounded-xl px-4 py-2.5 text-xs text-[#0d0520] focus:border-[#6a00ff] transition-all outline-none"
                      />
                      <span className="text-[9px] text-[#7d718c] mt-0.5 block">Comma separated list of keywords.</span>
                    </div>
                  </div>

                  {/* Real-time Google SERP Preview Card */}
                  <div className="bg-white rounded-3xl border border-[#ddd0f4]/55 p-6 space-y-3 shadow-[0_4px_35px_rgba(13,5,32,0.01)]">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#7d718c] flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-[#6a00ff]" /> Google SERP Preview
                    </h3>
                    
                    <div className="border border-[#ddd0f4] rounded-xl p-4 bg-white font-serif">
                      <div className="text-xs text-[#1a0dab] hover:underline cursor-pointer font-sans truncate" style={{ fontSize: '18px', lineHeight: '22px' }}>
                        {metaTitle || title || 'Please enter an article title'}
                      </div>
                      <div className="text-xs text-[#006621] font-sans flex items-center gap-1 mt-1">
                        https://digioverse.com <span className="text-[10px] text-[#70757a]">› blog › {slug || 'slug'}</span>
                      </div>
                      <div className="text-xs text-[#545454] font-sans mt-1.5 leading-relaxed break-words" style={{ fontSize: '13px' }}>
                        <span className="text-[#70757a]">{date} — </span>
                        {metaDescription || excerpt || 'Please write an excerpt or meta description.'}
                      </div>
                    </div>
                  </div>

                  {/* JSON-LD Schema Editor Card */}
                  <div className="bg-white rounded-3xl border border-[#ddd0f4]/55 p-6 space-y-3 shadow-[0_4px_35px_rgba(13,5,32,0.01)]">
                    <h3 className="text-base font-bold text-[#0d0520] border-b border-[#ddd0f4]/50 pb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#6a00ff]" /> Schema.org Structured Data
                    </h3>
                    <textarea
                      value={schemaText}
                      onChange={(e) => setSchemaText(e.target.value)}
                      rows={8}
                      className="w-full bg-[#f7f7fa] border border-[#ddd0f4] rounded-xl p-3 text-xs text-[#0d0520] focus:border-[#6a00ff] focus:bg-white transition-all outline-none font-mono resize-y"
                    />
                  </div>
                </div>

              </div>
            </form>
          )}

        </div>
      </div>
    </>
  );
}
