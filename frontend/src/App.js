// // import React, { useState, useEffect } from 'react';
// // import { Search, TrendingUp, BarChart3, PieChart, Activity, Clock, Database, CheckCircle, XCircle, Loader2, ChevronRight } from 'lucide-react';

// // const API_BASE_URL = "http://localhost:8000";

// // // Color scheme
// // const colors = {
// //   primary: 'rgb(150, 133, 117)',
// //   primaryHover: 'rgb(100, 89, 78)',
// //   background: 'rgb(255, 255, 255)',
// //   backgroundSecondary: 'rgb(244, 235, 226)',
// //   text: 'rgb(0, 0, 0)',
// //   textSecondary: 'rgb(51, 51, 51)',
// //   accent: 'rgb(150, 133, 117)',
// //   border: 'rgb(200, 178, 156)',
// //   borderLight: 'rgb(244, 235, 226)',
// // };

// // // Logo Component - Replace with your own logo
// // const HummingBirdLogo = ({ size = 200 }) => {
// //   // OPTION 1: Use your logo image file (PNG, JPG, SVG)
// //   // Uncomment and replace the path with your logo file path:
// //   return (
// //     <img 
// //       src="/logo.png" 
// //       alt="HummingBird Logo" 
// //       style={{ width: `120x`, height: `80px`, objectFit: 'contain' }}
// //     />
// //   );
  
// //   // OPTION 2: Use SVG from URL
// //   // return (
// //   //   <img 
// //   //     src="https://your-domain.com/logo.svg" 
// //   //     alt="HummingBird Logo" 
// //   //     style={{ width: `${size}px`, height: `${size}px`, objectFit: 'contain' }}
// //   //   />
// //   // );
  
// //   // OPTION 3: Default SVG logo (current)
// //   // return (
// //   //   <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
// //   //     <ellipse cx="50" cy="55" rx="18" ry="25" fill={colors.primary} opacity="0.9"/>
// //   //     <circle cx="50" cy="35" r="12" fill={colors.primary}/>
// //   //     <path d="M50 29 L50 18 L52 29 Z" fill={colors.primaryHover}/>
// //   //     <path d="M35 50 Q20 45 15 55 Q18 50 25 52 Q30 53 35 50 Z" 
// //   //           fill={colors.primary} opacity="0.7"/>
// //   //     <path d="M65 50 Q80 45 85 55 Q82 50 75 52 Q70 53 65 50 Z" 
// //   //           fill={colors.primary} opacity="0.7"/>
// //   //     <path d="M50 75 L45 90 L50 78 L55 90 Z" fill={colors.primary} opacity="0.8"/>
// //   //     <circle cx="48" cy="33" r="2" fill="white"/>
// //   //     <path d="M10 35 L25 35" stroke={colors.primary} strokeWidth="1.5" opacity="0.3"/>
// //   //     <path d="M12 42 L22 42" stroke={colors.primary} strokeWidth="1.5" opacity="0.3"/>
// //   //   </svg>
// //   // );
// // };

// // export default function HummingBirdAnalytics() {
// //   const [query, setQuery] = useState('');
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [result, setResult] = useState(null);
// //   const [apiHealthy, setApiHealthy] = useState(false);
// //   const [history, setHistory] = useState([]);

// //   useEffect(() => {
// //     checkApiHealth();
// //   }, []);

// //   const checkApiHealth = async () => {
// //     try {
// //       const response = await fetch(`${API_BASE_URL}/api/health`, { timeout: 5000 });
// //       setApiHealthy(response.ok);
// //     } catch (error) {
// //       setApiHealthy(false);
// //     }
// //   };

// //   const executeQuery = async (queryText) => {
// //     if (!queryText.trim()) return;
    
// //     setIsLoading(true);
// //     setResult(null);

// //     try {
// //       const response = await fetch(`${API_BASE_URL}/api/query`, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ query: queryText }),
// //       });

// //       const data = await response.json();
// //       setResult(data);
      
// //       if (data.success) {
// //         setHistory(prev => [{
// //           query: queryText,
// //           timestamp: new Date().toISOString(),
// //           recordCount: data.raw_results?.length || 0
// //         }, ...prev].slice(0, 5));
// //       }
// //     } catch (error) {
// //       setResult({
// //         success: false,
// //         error: error.message
// //       });
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const exampleQueries = [
// //     { icon: BarChart3, text: 'Show total number of bookings' },
// //     { icon: TrendingUp, text: 'What is the total revenue by city?' },
// //     { icon: PieChart, text: 'Show average rating by property' },
// //     { icon: Activity, text: 'Show booking trends by month' },
// //   ];

// //   return (
// //     <div style={{ minHeight: '100vh', background: '#FAFAFA', fontFamily: '"Cormorant Garamond", "Playfair Display", serif' }}>
// //       <head>
// //         <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
// //       </head>
      
// //       {/* Header */}
// //       <header style={{
// //         background: colors.background,
// //         borderBottom: `1px solid ${colors.borderLight}`,
// //         padding: '1.25rem 0',
// //         position: 'sticky',
// //         top: 0,
// //         zIndex: 50,
// //         backdropFilter: 'blur(10px)',
// //         backgroundColor: 'rgba(255, 255, 255, 0.95)'
// //       }}>
// //         <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
// //           <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
// //             <HummingBirdLogo size={40} />
// //             <div>
// //               <h1 style={{ fontSize: '1.5rem', fontWeight: '600', color: colors.text, margin: 0, letterSpacing: '-0.01em' }}>
// //                 HUMMINGBIRD
// //               </h1>
// //               <p style={{ fontSize: '0.75rem', color: colors.textSecondary, margin: 0, letterSpacing: '0.05em' }}>
// //                 ANALYTICS
// //               </p>
// //             </div>
// //           </div>
          
// //           <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
// //             <nav style={{ display: 'flex', gap: '2rem' }}>
// //               <a href="#" style={{ fontSize: '0.875rem', color: colors.textSecondary, textDecoration: 'none', fontWeight: '400', fontFamily: 'Inter, sans-serif' }}>Dashboard</a>
// //               <a href="#" style={{ fontSize: '0.875rem', color: colors.textSecondary, textDecoration: 'none', fontWeight: '400', fontFamily: 'Inter, sans-serif' }}>Reports</a>
// //               <a href="#" style={{ fontSize: '0.875rem', color: colors.textSecondary, textDecoration: 'none', fontWeight: '400', fontFamily: 'Inter, sans-serif' }}>Settings</a>
// //             </nav>
// //             <div style={{
// //               display: 'flex',
// //               alignItems: 'center',
// //               gap: '0.5rem',
// //               fontSize: '0.875rem',
// //               color: apiHealthy ? '#2E7D32' : '#C62828'
// //             }}>
// //               <div style={{
// //                 width: '8px',
// //                 height: '8px',
// //                 borderRadius: '50%',
// //                 background: apiHealthy ? '#4CAF50' : '#F44336'
// //               }}></div>
// //               <span style={{ fontWeight: '500' }}>{apiHealthy ? 'Connected' : 'Offline'}</span>
// //             </div>
// //           </div>
// //         </div>
// //       </header>

// //       {/* Black Bar */}
// //       <div style={{
// //         background: colors.text,
// //         padding: '1.25rem 0',
// //         borderBottom: `1px solid ${colors.border}`
// //       }}>
// //         <div style={{ 
// //           maxWidth: '1400px', 
// //           margin: '0 auto', 
// //           padding: '0 2rem',
// //           textAlign: 'center'
// //         }}>
// //           <p style={{
// //             fontSize: '0.9375rem',
// //             color: colors.background,
// //             margin: 0,
// //             fontFamily: 'Inter, sans-serif',
// //             fontWeight: '300',
// //             letterSpacing: '0.05em'
// //           }}>
// //             Automated business stay for corporate India
// //           </p>
// //         </div>
// //       </div>

// //       {/* Main Content */}
// //       <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '4rem 2rem' }}>
        
// //         {/* Search Section */}
// //         <div style={{ maxWidth: '800px', margin: '0 auto 4rem' }}>
// //           <h2 style={{
// //             fontSize: '2.75rem',
// //             fontWeight: '400',
// //             color: colors.text,
// //             textAlign: 'center',
// //             marginBottom: '0.75rem',
// //             letterSpacing: '0.01em',
// //             lineHeight: '1.2'
// //           }}>
// //             Ask anything about your data
// //           </h2>
// //           <p style={{
// //             fontSize: '1.125rem',
// //             color: colors.textSecondary,
// //             textAlign: 'center',
// //             marginBottom: '2.5rem',
// //             fontWeight: '300',
// //             fontFamily: 'Inter, sans-serif'
// //           }}>
// //             Natural language queries powered by AI
// //           </p>

// //           <div style={{ position: 'relative' }}>
// //             <input
// //               type="text"
// //               value={query}
// //               onChange={(e) => setQuery(e.target.value)}
// //               onKeyPress={(e) => e.key === 'Enter' && executeQuery(query)}
// //               placeholder="e.g., Show total bookings by city"
// //               disabled={isLoading}
// //               style={{
// //                 width: '100%',
// //                 padding: '1.25rem 8rem 1.25rem 1.5rem',
// //                 fontSize: '1rem',
// //                 border: `1px solid ${colors.borderLight}`,
// //                 borderRadius: '8px',
// //                 outline: 'none',
// //                 transition: 'all 0.2s',
// //                 background: colors.background,
// //                 boxSizing: 'border-box',
// //                 fontWeight: '400'
// //               }}
// //               onFocus={(e) => {
// //                 e.target.style.borderColor = colors.primary;
// //                 e.target.style.boxShadow = `0 0 0 3px ${colors.primary}15`;
// //               }}
// //               onBlur={(e) => {
// //                 e.target.style.borderColor = colors.borderLight;
// //                 e.target.style.boxShadow = 'none';
// //               }}
// //             />
// //             <button
// //               onClick={() => executeQuery(query)}
// //               disabled={isLoading || !query.trim()}
// //               style={{
// //                 position: 'absolute',
// //                 right: '0.5rem',
// //                 top: '50%',
// //                 transform: 'translateY(-50%)',
// //                 background: colors.primary,
// //                 color: 'white',
// //                 border: 'none',
// //                 borderRadius: '6px',
// //                 padding: '0.75rem 1.5rem',
// //                 cursor: isLoading ? 'not-allowed' : 'pointer',
// //                 display: 'flex',
// //                 alignItems: 'center',
// //                 gap: '0.5rem',
// //                 fontSize: '0.875rem',
// //                 fontWeight: '600',
// //                 opacity: isLoading || !query.trim() ? 0.5 : 1,
// //                 transition: 'all 0.2s',
// //                 letterSpacing: '0.01em'
// //               }}
// //               onMouseEnter={(e) => {
// //                 if (!isLoading && query.trim()) {
// //                   e.target.style.background = colors.primaryHover;
// //                 }
// //               }}
// //               onMouseLeave={(e) => {
// //                 e.target.style.background = colors.primary;
// //               }}
// //             >
// //               {isLoading ? (
// //                 <>
// //                   <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
// //                   <span>Analyzing</span>
// //                 </>
// //               ) : (
// //                 <>
// //                   <Search size={16} />
// //                   <span>Analyze</span>
// //                 </>
// //               )}
// //             </button>
// //           </div>
// //         </div>

// //         {/* Example Queries */}
// //         {!result && (
// //           <div style={{ maxWidth: '1000px', margin: '0 auto 4rem' }}>
// //             <div style={{
// //               display: 'grid',
// //               gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
// //               gap: '1rem'
// //             }}>
// //               {exampleQueries.map((example, idx) => (
// //                 <button
// //                   key={idx}
// //                   onClick={() => {
// //                     setQuery(example.text);
// //                     executeQuery(example.text);
// //                   }}
// //                   style={{
// //                     background: colors.background,
// //                     border: `1px solid ${colors.borderLight}`,
// //                     borderRadius: '8px',
// //                     padding: '1.5rem',
// //                     textAlign: 'left',
// //                     cursor: 'pointer',
// //                     transition: 'all 0.2s',
// //                     display: 'flex',
// //                     flexDirection: 'column',
// //                     gap: '1rem'
// //                   }}
// //                   onMouseEnter={(e) => {
// //                     e.currentTarget.style.borderColor = colors.primary;
// //                     e.currentTarget.style.transform = 'translateY(-2px)';
// //                     e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.08)';
// //                   }}
// //                   onMouseLeave={(e) => {
// //                     e.currentTarget.style.borderColor = colors.borderLight;
// //                     e.currentTarget.style.transform = 'translateY(0)';
// //                     e.currentTarget.style.boxShadow = 'none';
// //                   }}
// //                 >
// //                   <example.icon size={24} color={colors.primary} strokeWidth={1.5} />
// //                   <span style={{ fontSize: '0.9375rem', color: colors.text, lineHeight: '1.5', fontWeight: '500' }}>
// //                     {example.text}
// //                   </span>
// //                 </button>
// //               ))}
// //             </div>
// //           </div>
// //         )}

// //         {/* Results */}
// //         {result && (
// //           <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
// //             {result.success ? (
// //               <>
// //                 {/* Answer */}
// //                 <div style={{
// //                   background: colors.background,
// //                   borderRadius: '8px',
// //                   padding: '2.5rem',
// //                   marginBottom: '2rem',
// //                   border: `1px solid ${colors.borderLight}`
// //                 }}>
// //                   <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
// //                     <div style={{
// //                       width: '48px',
// //                       height: '48px',
// //                       borderRadius: '8px',
// //                       background: colors.backgroundSecondary,
// //                       display: 'flex',
// //                       alignItems: 'center',
// //                       justifyContent: 'center',
// //                       flexShrink: 0
// //                     }}>
// //                       <CheckCircle size={24} color={colors.primary} strokeWidth={2} />
// //                     </div>
// //                     <div style={{ flex: 1 }}>
// //                       <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: colors.textSecondary, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
// //                         Answer
// //                       </h3>
// //                       <p style={{ fontSize: '1.125rem', color: colors.text, lineHeight: '1.7', margin: 0, fontWeight: '400' }}>
// //                         {result.answer || result.response}
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Visualizations - Only show if charts exist */}
// //                 {result.suggested_charts && result.suggested_charts.length > 0 && result.raw_results && result.raw_results.length > 0 && (
// //                   <div style={{
// //                     background: colors.background,
// //                     borderRadius: '8px',
// //                     padding: '2.5rem',
// //                     marginBottom: '2rem',
// //                     border: `1px solid ${colors.borderLight}`
// //                   }}>
// //                     <h3 style={{ 
// //                       fontSize: '0.875rem', 
// //                       fontWeight: '600', 
// //                       color: colors.textSecondary, 
// //                       marginBottom: '1.5rem', 
// //                       textTransform: 'uppercase', 
// //                       letterSpacing: '0.05em',
// //                       fontFamily: 'Inter, sans-serif'
// //                     }}>
// //                       Visualizations
// //                     </h3>
// //                     <div style={{
// //                       display: 'grid',
// //                       gridTemplateColumns: result.suggested_charts.length === 1 ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))',
// //                       gap: '2rem'
// //                     }}>
// //                       {result.suggested_charts.map((chart, idx) => {
// //                         const chartData = result.raw_results;
// //                         const xCol = chart.x_column;
// //                         const yCol = chart.y_column;
                        
// //                         if (!xCol || !yCol || !chartData.length) return null;
                        
// //                         const maxValue = Math.max(...chartData.map(d => Number(d[yCol]) || 0));
                        
// //                         return (
// //                           <div key={idx} style={{
// //                             background: '#FAFAFA',
// //                             borderRadius: '8px',
// //                             padding: '1.5rem',
// //                             border: `1px solid ${colors.borderLight}`
// //                           }}>
// //                             <h4 style={{
// //                               fontSize: '1rem',
// //                               fontWeight: '500',
// //                               color: colors.text,
// //                               marginBottom: '1.5rem',
// //                               fontFamily: 'Cormorant Garamond, serif'
// //                             }}>
// //                               {chart.title || `${yCol} by ${xCol}`}
// //                             </h4>
// //                             <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
// //                               {chartData.slice(0, 8).map((item, dataIdx) => {
// //                                 const value = Number(item[yCol]) || 0;
// //                                 const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
                                
// //                                 return (
// //                                   <div key={dataIdx} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
// //                                     <div style={{
// //                                       minWidth: '120px',
// //                                       fontSize: '0.875rem',
// //                                       color: colors.text,
// //                                       fontFamily: 'Inter, sans-serif',
// //                                       fontWeight: '400'
// //                                     }}>
// //                                       {String(item[xCol]).substring(0, 20)}
// //                                     </div>
// //                                     <div style={{ flex: 1, position: 'relative', height: '32px', display: 'flex', alignItems: 'center' }}>
// //                                       <div style={{
// //                                         width: `${percentage}%`,
// //                                         height: '24px',
// //                                         background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.primaryHover} 100%)`,
// //                                         borderRadius: '4px',
// //                                         transition: 'width 0.5s ease',
// //                                         minWidth: '2px'
// //                                       }}></div>
// //                                     </div>
// //                                     <div style={{
// //                                       minWidth: '80px',
// //                                       fontSize: '0.875rem',
// //                                       color: colors.textSecondary,
// //                                       fontFamily: 'Inter, sans-serif',
// //                                       fontWeight: '500',
// //                                       textAlign: 'right'
// //                                     }}>
// //                                       {typeof value === 'number' ? value.toLocaleString() : value}
// //                                     </div>
// //                                   </div>
// //                                 );
// //                               })}
// //                             </div>
// //                           </div>
// //                         );
// //                       })}
// //                     </div>
// //                   </div>
// //                 )}

// //                 {/* Data Table */}
// //                 {result.raw_results && result.raw_results.length > 0 && (
// //                   <div style={{
// //                     background: colors.background,
// //                     borderRadius: '8px',
// //                     padding: '2.5rem',
// //                     border: `1px solid ${colors.borderLight}`,
// //                     overflowX: 'auto'
// //                   }}>
// //                     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
// //                       <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: colors.text, margin: 0, letterSpacing: '-0.01em' }}>
// //                         Data Results
// //                       </h3>
// //                       <span style={{
// //                         fontSize: '0.875rem',
// //                         color: colors.textSecondary,
// //                         background: colors.backgroundSecondary,
// //                         padding: '0.375rem 0.875rem',
// //                         borderRadius: '6px',
// //                         fontWeight: '500'
// //                       }}>
// //                         {result.raw_results.length} {result.raw_results.length === 1 ? 'record' : 'records'}
// //                       </span>
// //                     </div>
                    
// //                     <div style={{ overflowX: 'auto' }}>
// //                       <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9375rem' }}>
// //                         <thead>
// //                           <tr style={{ borderBottom: `2px solid ${colors.borderLight}` }}>
// //                             {Object.keys(result.raw_results[0]).map((key) => (
// //                               <th key={key} style={{
// //                                 padding: '1rem',
// //                                 textAlign: 'left',
// //                                 fontWeight: '600',
// //                                 color: colors.text,
// //                                 fontSize: '0.875rem',
// //                                 textTransform: 'uppercase',
// //                                 letterSpacing: '0.05em'
// //                               }}>
// //                                 {key}
// //                               </th>
// //                             ))}
// //                           </tr>
// //                         </thead>
// //                         <tbody>
// //                           {result.raw_results.slice(0, 10).map((row, idx) => (
// //                             <tr key={idx} style={{
// //                               borderBottom: `1px solid ${colors.borderLight}`,
// //                               transition: 'background 0.15s'
// //                             }}
// //                             onMouseEnter={(e) => e.currentTarget.style.background = '#FAFAFA'}
// //                             onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
// //                             >
// //                               {Object.values(row).map((value, vIdx) => (
// //                                 <td key={vIdx} style={{
// //                                   padding: '1rem',
// //                                   color: colors.textSecondary,
// //                                   fontWeight: '400'
// //                                 }}>
// //                                   {value}
// //                                 </td>
// //                               ))}
// //                             </tr>
// //                           ))}
// //                         </tbody>
// //                       </table>
// //                     </div>
// //                   </div>
// //                 )}
// //               </>
// //             ) : (
// //               <div style={{
// //                 background: '#FFF5F5',
// //                 borderRadius: '8px',
// //                 padding: '2.5rem',
// //                 border: '1px solid #FFCDD2',
// //                 display: 'flex',
// //                 alignItems: 'flex-start',
// //                 gap: '1.5rem'
// //               }}>
// //                 <XCircle size={24} color="#C62828" strokeWidth={2} style={{ flexShrink: 0, marginTop: '2px' }} />
// //                 <div>
// //                   <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#C62828', margin: '0 0 0.5rem 0', letterSpacing: '-0.01em' }}>
// //                     Query Failed
// //                   </h3>
// //                   <p style={{ fontSize: '0.9375rem', color: '#B71C1C', margin: 0, lineHeight: '1.6' }}>
// //                     {result.error}
// //                   </p>
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         )}

// //         {/* History */}
// //         {history.length > 0 && (
// //           <div style={{ maxWidth: '1000px', margin: '4rem auto 0' }}>
// //             <h3 style={{
// //               fontSize: '0.875rem',
// //               fontWeight: '600',
// //               color: colors.textSecondary,
// //               textTransform: 'uppercase',
// //               letterSpacing: '0.05em',
// //               marginBottom: '1.5rem'
// //             }}>
// //               Recent Queries
// //             </h3>
// //             <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
// //               {history.map((item, idx) => (
// //                 <button
// //                   key={idx}
// //                   onClick={() => {
// //                     setQuery(item.query);
// //                     executeQuery(item.query);
// //                   }}
// //                   style={{
// //                     background: colors.background,
// //                     border: `1px solid ${colors.borderLight}`,
// //                     borderRadius: '8px',
// //                     padding: '1.25rem 1.5rem',
// //                     textAlign: 'left',
// //                     cursor: 'pointer',
// //                     transition: 'all 0.2s',
// //                     display: 'flex',
// //                     alignItems: 'center',
// //                     justifyContent: 'space-between',
// //                     gap: '1rem'
// //                   }}
// //                   onMouseEnter={(e) => {
// //                     e.currentTarget.style.borderColor = colors.primary;
// //                     e.currentTarget.style.background = '#FAFAFA';
// //                   }}
// //                   onMouseLeave={(e) => {
// //                     e.currentTarget.style.borderColor = colors.borderLight;
// //                     e.currentTarget.style.background = colors.background;
// //                   }}
// //                 >
// //                   <span style={{ fontSize: '0.9375rem', color: colors.text, fontWeight: '400', flex: 1 }}>{item.query}</span>
// //                   <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
// //                     <span style={{
// //                       fontSize: '0.8125rem',
// //                       color: colors.textSecondary,
// //                       background: colors.backgroundSecondary,
// //                       padding: '0.25rem 0.75rem',
// //                       borderRadius: '6px',
// //                       fontWeight: '500'
// //                     }}>
// //                       {item.recordCount} records
// //                     </span>
// //                     <ChevronRight size={16} color={colors.textSecondary} />
// //                   </div>
// //                 </button>
// //               ))}
// //             </div>
// //           </div>
// //         )}
// //       </main>

// //       <style>{`
// //         @keyframes spin {
// //           from { transform: rotate(0deg); }
// //           to { transform: rotate(360deg); }
// //         }
// //       `}</style>
// //     </div>
// //   );
// // }


// import React, { useState, useEffect } from 'react';
// import { Search, TrendingUp, BarChart3, PieChart, Activity, Clock, Database, CheckCircle, XCircle, Loader2, ChevronRight } from 'lucide-react';

// const API_BASE_URL = "http://localhost:8000";

// // Color scheme
// const colors = {
//   primary: 'rgb(150, 133, 117)',
//   primaryHover: 'rgb(100, 89, 78)',
//   background: 'rgb(255, 255, 255)',
//   backgroundSecondary: 'rgb(244, 235, 226)',
//   text: 'rgb(0, 0, 0)',
//   textSecondary: 'rgb(51, 51, 51)',
//   accent: 'rgb(150, 133, 117)',
//   border: 'rgb(200, 178, 156)',
//   borderLight: 'rgb(244, 235, 226)',
// };

// // Logo Component - Replace with your own logo
// const HummingBirdLogo = ({ size = 200 }) => {
//   // OPTION 1: Use your logo image file (PNG, JPG, SVG)
//   // Uncomment and replace the path with your logo file path:
//   return (
//     <img 
//       src="/logo.png" 
//       alt="HummingBird Logo" 
//       style={{ width: `120px`, height: `80px`, objectFit: 'contain' }}
//     />
//   );
  
//   // OPTION 2: Use SVG from URL
//   // return (
//   //   <img 
//   //     src="https://your-domain.com/logo.svg" 
//   //     alt="HummingBird Logo" 
//   //     style={{ width: `${size}px`, height: `${size}px`, objectFit: 'contain' }}
//   //   />
//   // );
  
//   // OPTION 3: Default SVG logo (current)
//   // return (
//   //   <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
//   //     <ellipse cx="50" cy="55" rx="18" ry="25" fill={colors.primary} opacity="0.9"/>
//   //     <circle cx="50" cy="35" r="12" fill={colors.primary}/>
//   //     <path d="M50 29 L50 18 L52 29 Z" fill={colors.primaryHover}/>
//   //     <path d="M35 50 Q20 45 15 55 Q18 50 25 52 Q30 53 35 50 Z" 
//   //           fill={colors.primary} opacity="0.7"/>
//   //     <path d="M65 50 Q80 45 85 55 Q82 50 75 52 Q70 53 65 50 Z" 
//   //           fill={colors.primary} opacity="0.7"/>
//   //     <path d="M50 75 L45 90 L50 78 L55 90 Z" fill={colors.primary} opacity="0.8"/>
//   //     <circle cx="48" cy="33" r="2" fill="white"/>
//   //     <path d="M10 35 L25 35" stroke={colors.primary} strokeWidth="1.5" opacity="0.3"/>
//   //     <path d="M12 42 L22 42" stroke={colors.primary} strokeWidth="1.5" opacity="0.3"/>
//   //   </svg>
//   // );
// };

// export default function HummingBirdAnalytics() {
//   const [query, setQuery] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [apiHealthy, setApiHealthy] = useState(false);
//   const [history, setHistory] = useState([]);

//   useEffect(() => {
//     checkApiHealth();
//   }, []);

//   const checkApiHealth = async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/health`, { timeout: 5000 });
//       setApiHealthy(response.ok);
//     } catch (error) {
//       setApiHealthy(false);
//     }
//   };

//   const executeQuery = async (queryText) => {
//     if (!queryText.trim()) return;
    
//     setIsLoading(true);
//     setResult(null);

//     try {
//       const response = await fetch(`${API_BASE_URL}/api/query`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ query: queryText }),
//       });

//       const data = await response.json();
//       setResult(data);
      
//       if (data.success) {
//         setHistory(prev => [{
//           query: queryText,
//           timestamp: new Date().toISOString(),
//           recordCount: data.raw_results?.length || 0
//         }, ...prev].slice(0, 5));
//       }
//     } catch (error) {
//       setResult({
//         success: false,
//         error: error.message
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const exampleQueries = [
//     { icon: BarChart3, text: 'Show total number of bookings' },
//     { icon: TrendingUp, text: 'What is the total revenue by city?' },
//     { icon: PieChart, text: 'Show average rating by property' },
//     { icon: Activity, text: 'Show booking trends by month' },
//   ];

//   return (
//     <div style={{ minHeight: '100vh', background: '#FAFAFA', fontFamily: '"Cormorant Garamond", "Playfair Display", serif' }}>
//       <head>
//         <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
//       </head>
      
//       {/* Header */}
//       <header style={{
//         background: colors.background,
//         borderBottom: `1px solid ${colors.borderLight}`,
//         padding: '1.25rem 0',
//         position: 'sticky',
//         top: 0,
//         zIndex: 50,
//         backdropFilter: 'blur(10px)',
//         backgroundColor: 'rgba(255, 255, 255, 0.95)'
//       }}>
//         <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
//             <HummingBirdLogo size={40} />
//             <div>
//               <h1 style={{ fontSize: '1.5rem', fontWeight: '600', color: colors.text, margin: 0, letterSpacing: '-0.01em' }}>
//                 HUMMINGBIRD
//               </h1>
//               <p style={{ fontSize: '0.75rem', color: colors.textSecondary, margin: 0, letterSpacing: '0.05em' }}>
//                 ANALYTICS
//               </p>
//             </div>
//           </div>
          
//           <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
//             <nav style={{ display: 'flex', gap: '2rem' }}>
//               <a href="#" style={{ fontSize: '0.875rem', color: colors.textSecondary, textDecoration: 'none', fontWeight: '400', fontFamily: 'Inter, sans-serif' }}>Dashboard</a>
//               <a href="#" style={{ fontSize: '0.875rem', color: colors.textSecondary, textDecoration: 'none', fontWeight: '400', fontFamily: 'Inter, sans-serif' }}>Reports</a>
//               <a href="#" style={{ fontSize: '0.875rem', color: colors.textSecondary, textDecoration: 'none', fontWeight: '400', fontFamily: 'Inter, sans-serif' }}>Settings</a>
//             </nav>
//             <div style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '0.5rem',
//               fontSize: '0.875rem',
//               color: apiHealthy ? '#2E7D32' : '#C62828'
//             }}>
//               <div style={{
//                 width: '8px',
//                 height: '8px',
//                 borderRadius: '50%',
//                 background: apiHealthy ? '#4CAF50' : '#F44336'
//               }}></div>
//               <span style={{ fontWeight: '500' }}>{apiHealthy ? 'Connected' : 'Offline'}</span>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Black Bar */}
//       <div style={{
//         background: colors.text,
//         padding: '1.25rem 0',
//         borderBottom: `1px solid ${colors.border}`
//       }}>
//         <div style={{ 
//           maxWidth: '1400px', 
//           margin: '0 auto', 
//           padding: '0 2rem',
//           textAlign: 'center'
//         }}>
//           <p style={{
//             fontSize: '0.9375rem',
//             color: colors.background,
//             margin: 0,
//             fontFamily: 'Inter, sans-serif',
//             fontWeight: '300',
//             letterSpacing: '0.05em'
//           }}>
//             Automated business stay for corporate India
//           </p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '4rem 2rem' }}>
        
//         {/* Search Section */}
//         <div style={{ maxWidth: '800px', margin: '0 auto 4rem' }}>
//           <h2 style={{
//             fontSize: '2.75rem',
//             fontWeight: '400',
//             color: colors.text,
//             textAlign: 'center',
//             marginBottom: '0.75rem',
//             letterSpacing: '0.01em',
//             lineHeight: '1.2'
//           }}>
//             Ask anything about your data
//           </h2>
//           <p style={{
//             fontSize: '1.125rem',
//             color: colors.textSecondary,
//             textAlign: 'center',
//             marginBottom: '2.5rem',
//             fontWeight: '300',
//             fontFamily: 'Inter, sans-serif'
//           }}>
//             Natural language queries powered by AI
//           </p>

//           <div style={{ position: 'relative' }}>
//             <input
//               type="text"
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               onKeyPress={(e) => e.key === 'Enter' && executeQuery(query)}
//               placeholder="e.g., Show total bookings by city"
//               disabled={isLoading}
//               style={{
//                 width: '100%',
//                 padding: '1.25rem 8rem 1.25rem 1.5rem',
//                 fontSize: '1rem',
//                 border: `1px solid ${colors.borderLight}`,
//                 borderRadius: '8px',
//                 outline: 'none',
//                 transition: 'all 0.2s',
//                 background: colors.background,
//                 boxSizing: 'border-box',
//                 fontWeight: '400'
//               }}
//               onFocus={(e) => {
//                 e.target.style.borderColor = colors.primary;
//                 e.target.style.boxShadow = `0 0 0 3px ${colors.primary}15`;
//               }}
//               onBlur={(e) => {
//                 e.target.style.borderColor = colors.borderLight;
//                 e.target.style.boxShadow = 'none';
//               }}
//             />
//             <button
//               onClick={() => executeQuery(query)}
//               disabled={isLoading || !query.trim()}
//               style={{
//                 position: 'absolute',
//                 right: '0.5rem',
//                 top: '50%',
//                 transform: 'translateY(-50%)',
//                 background: colors.primary,
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '6px',
//                 padding: '0.75rem 1.5rem',
//                 cursor: isLoading ? 'not-allowed' : 'pointer',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '0.5rem',
//                 fontSize: '0.875rem',
//                 fontWeight: '600',
//                 opacity: isLoading || !query.trim() ? 0.5 : 1,
//                 transition: 'all 0.2s',
//                 letterSpacing: '0.01em'
//               }}
//               onMouseEnter={(e) => {
//                 if (!isLoading && query.trim()) {
//                   e.target.style.background = colors.primaryHover;
//                 }
//               }}
//               onMouseLeave={(e) => {
//                 e.target.style.background = colors.primary;
//               }}
//             >
//               {isLoading ? (
//                 <>
//                   <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
//                   <span>Analyzing</span>
//                 </>
//               ) : (
//                 <>
//                   <Search size={16} />
//                   <span>Analyze</span>
//                 </>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Example Queries */}
//         {!result && (
//           <div style={{ maxWidth: '1000px', margin: '0 auto 4rem' }}>
//             <div style={{
//               display: 'grid',
//               gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
//               gap: '1rem'
//             }}>
//               {exampleQueries.map((example, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => {
//                     setQuery(example.text);
//                     executeQuery(example.text);
//                   }}
//                   style={{
//                     background: colors.background,
//                     border: `1px solid ${colors.borderLight}`,
//                     borderRadius: '8px',
//                     padding: '1.5rem',
//                     textAlign: 'left',
//                     cursor: 'pointer',
//                     transition: 'all 0.2s',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     gap: '1rem'
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.borderColor = colors.primary;
//                     e.currentTarget.style.transform = 'translateY(-2px)';
//                     e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.08)';
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.borderColor = colors.borderLight;
//                     e.currentTarget.style.transform = 'translateY(0)';
//                     e.currentTarget.style.boxShadow = 'none';
//                   }}
//                 >
//                   <example.icon size={24} color={colors.primary} strokeWidth={1.5} />
//                   <span style={{ fontSize: '0.9375rem', color: colors.text, lineHeight: '1.5', fontWeight: '500' }}>
//                     {example.text}
//                   </span>
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Results */}
//         {result && (
//           <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
//             {result.success ? (
//               <>
//                 {/* Answer */}
//                 <div style={{
//                   background: colors.background,
//                   borderRadius: '8px',
//                   padding: '2.5rem',
//                   marginBottom: '2rem',
//                   border: `1px solid ${colors.borderLight}`
//                 }}>
//                   <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
//                     <div style={{
//                       width: '48px',
//                       height: '48px',
//                       borderRadius: '8px',
//                       background: colors.backgroundSecondary,
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       flexShrink: 0
//                     }}>
//                       <CheckCircle size={24} color={colors.primary} strokeWidth={2} />
//                     </div>
//                     <div style={{ flex: 1 }}>
//                       <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: colors.textSecondary, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
//                         Summary
//                       </h3>
//                       <div style={{ 
//                         fontSize: '1rem', 
//                         color: colors.text, 
//                         lineHeight: '1.7', 
//                         fontWeight: '400',
//                         maxHeight: '400px',
//                         overflowY: 'auto',
//                         padding: '1rem',
//                         background: '#FAFAFA',
//                         borderRadius: '6px',
//                         border: `1px solid ${colors.borderLight}`
//                       }}>
//                         {(() => {
//                           const answerText = result.answer || result.response;
                          
//                           // Parse and render markdown-style content
//                           return answerText.split('\n').map((line, idx) => {
//                             // Handle headers
//                             if (line.startsWith('# ')) {
//                               return <h4 key={idx} style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: colors.text }}>{line.replace('# ', '')}</h4>;
//                             }
//                             if (line.startsWith('## ')) {
//                               return <h5 key={idx} style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem', color: colors.text }}>{line.replace('## ', '')}</h5>;
//                             }
                            
//                             // Handle bold text
//                             if (line.includes('**')) {
//                               const parts = line.split('**');
//                               return (
//                                 <p key={idx} style={{ marginBottom: '0.75rem', fontSize: '0.9375rem' }}>
//                                   {parts.map((part, i) => 
//                                     i % 2 === 1 ? <strong key={i} style={{ fontWeight: '600' }}>{part}</strong> : part
//                                   )}
//                                 </p>
//                               );
//                             }
                            
//                             // Handle table rows
//                             if (line.startsWith('|')) {
//                               return null; // Tables will be handled by the data table below
//                             }
                            
//                             // Regular paragraphs
//                             if (line.trim()) {
//                               return <p key={idx} style={{ marginBottom: '0.75rem', fontSize: '0.9375rem' }}>{line}</p>;
//                             }
                            
//                             return <br key={idx} />;
//                           });
//                         })()}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Visualizations - Only show if charts exist */}
//                 {result.suggested_charts && result.suggested_charts.length > 0 && result.raw_results && result.raw_results.length > 0 && (
//                   <div style={{
//                     background: colors.background,
//                     borderRadius: '8px',
//                     padding: '2.5rem',
//                     marginBottom: '2rem',
//                     border: `1px solid ${colors.borderLight}`
//                   }}>
//                     <h3 style={{ 
//                       fontSize: '0.875rem', 
//                       fontWeight: '600', 
//                       color: colors.textSecondary, 
//                       marginBottom: '1.5rem', 
//                       textTransform: 'uppercase', 
//                       letterSpacing: '0.05em',
//                       fontFamily: 'Inter, sans-serif'
//                     }}>
//                       Visualizations
//                     </h3>
//                     <div style={{
//                       display: 'grid',
//                       gridTemplateColumns: result.suggested_charts.length === 1 ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))',
//                       gap: '2rem'
//                     }}>
//                       {result.suggested_charts.map((chart, idx) => {
//                         const chartData = result.raw_results;
//                         const xCol = chart.x_column;
//                         const yCol = chart.y_column;
                        
//                         if (!xCol || !yCol || !chartData.length) return null;
                        
//                         const maxValue = Math.max(...chartData.map(d => Number(d[yCol]) || 0));
                        
//                         return (
//                           <div key={idx} style={{
//                             background: '#FAFAFA',
//                             borderRadius: '8px',
//                             padding: '1.5rem',
//                             border: `1px solid ${colors.borderLight}`
//                           }}>
//                             <h4 style={{
//                               fontSize: '1rem',
//                               fontWeight: '500',
//                               color: colors.text,
//                               marginBottom: '1.5rem',
//                               fontFamily: 'Cormorant Garamond, serif'
//                             }}>
//                               {chart.title || `${yCol} by ${xCol}`}
//                             </h4>
//                             <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
//                               {chartData.slice(0, 8).map((item, dataIdx) => {
//                                 const value = Number(item[yCol]) || 0;
//                                 const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
                                
//                                 return (
//                                   <div key={dataIdx} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
//                                     <div style={{
//                                       minWidth: '120px',
//                                       fontSize: '0.875rem',
//                                       color: colors.text,
//                                       fontFamily: 'Inter, sans-serif',
//                                       fontWeight: '400'
//                                     }}>
//                                       {String(item[xCol]).substring(0, 20)}
//                                     </div>
//                                     <div style={{ flex: 1, position: 'relative', height: '32px', display: 'flex', alignItems: 'center' }}>
//                                       <div style={{
//                                         width: `${percentage}%`,
//                                         height: '24px',
//                                         background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.primaryHover} 100%)`,
//                                         borderRadius: '4px',
//                                         transition: 'width 0.5s ease',
//                                         minWidth: '2px'
//                                       }}></div>
//                                     </div>
//                                     <div style={{
//                                       minWidth: '80px',
//                                       fontSize: '0.875rem',
//                                       color: colors.textSecondary,
//                                       fontFamily: 'Inter, sans-serif',
//                                       fontWeight: '500',
//                                       textAlign: 'right'
//                                     }}>
//                                       {typeof value === 'number' ? value.toLocaleString() : value}
//                                     </div>
//                                   </div>
//                                 );
//                               })}
//                             </div>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}

//                 {/* Data Table */}
//                 {result.raw_results && result.raw_results.length > 0 && (
//                   <div style={{
//                     background: colors.background,
//                     borderRadius: '8px',
//                     padding: '2.5rem',
//                     border: `1px solid ${colors.borderLight}`
//                   }}>
//                     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
//                       <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: colors.text, margin: 0, letterSpacing: '-0.01em' }}>
//                         Complete Data Results
//                       </h3>
//                       <span style={{
//                         fontSize: '0.875rem',
//                         color: colors.textSecondary,
//                         background: colors.backgroundSecondary,
//                         padding: '0.375rem 0.875rem',
//                         borderRadius: '6px',
//                         fontWeight: '500'
//                       }}>
//                         {result.raw_results.length} {result.raw_results.length === 1 ? 'record' : 'records'}
//                       </span>
//                     </div>
                    
//                     <div style={{ 
//                       overflowX: 'auto',
//                       overflowY: 'auto',
//                       maxHeight: '500px',
//                       border: `1px solid ${colors.borderLight}`,
//                       borderRadius: '6px'
//                     }}>
//                       <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9375rem' }}>
//                         <thead style={{ 
//                           position: 'sticky', 
//                           top: 0, 
//                           background: colors.background,
//                           zIndex: 10,
//                           boxShadow: `0 2px 4px rgba(0,0,0,0.05)`
//                         }}>
//                           <tr style={{ borderBottom: `2px solid ${colors.borderLight}` }}>
//                             {Object.keys(result.raw_results[0]).map((key) => (
//                               <th key={key} style={{
//                                 padding: '1rem',
//                                 textAlign: 'left',
//                                 fontWeight: '600',
//                                 color: colors.text,
//                                 fontSize: '0.875rem',
//                                 textTransform: 'uppercase',
//                                 letterSpacing: '0.05em',
//                                 background: colors.background,
//                                 whiteSpace: 'nowrap'
//                               }}>
//                                 {key}
//                               </th>
//                             ))}
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {result.raw_results.map((row, idx) => (
//                             <tr key={idx} style={{
//                               borderBottom: `1px solid ${colors.borderLight}`,
//                               transition: 'background 0.15s'
//                             }}
//                             onMouseEnter={(e) => e.currentTarget.style.background = '#FAFAFA'}
//                             onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
//                             >
//                               {Object.values(row).map((value, vIdx) => (
//                                 <td key={vIdx} style={{
//                                   padding: '1rem',
//                                   color: colors.textSecondary,
//                                   fontWeight: '400',
//                                   whiteSpace: 'nowrap'
//                                 }}>
//                                   {value !== null && value !== undefined ? String(value) : '-'}
//                                 </td>
//                               ))}
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
                    
//                     {result.raw_results.length > 10 && (
//                       <p style={{
//                         fontSize: '0.8125rem',
//                         color: colors.textSecondary,
//                         marginTop: '1rem',
//                         textAlign: 'center',
//                         fontStyle: 'italic'
//                       }}>
//                         Scroll to view all {result.raw_results.length} records
//                       </p>
//                     )}
//                   </div>
//                 )}
//               </>
//             ) : (
//               <div style={{
//                 background: '#FFF5F5',
//                 borderRadius: '8px',
//                 padding: '2.5rem',
//                 border: '1px solid #FFCDD2',
//                 display: 'flex',
//                 alignItems: 'flex-start',
//                 gap: '1.5rem'
//               }}>
//                 <XCircle size={24} color="#C62828" strokeWidth={2} style={{ flexShrink: 0, marginTop: '2px' }} />
//                 <div>
//                   <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#C62828', margin: '0 0 0.5rem 0', letterSpacing: '-0.01em' }}>
//                     Query Failed
//                   </h3>
//                   <p style={{ fontSize: '0.9375rem', color: '#B71C1C', margin: 0, lineHeight: '1.6' }}>
//                     {result.error}
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* History */}
//         {history.length > 0 && (
//           <div style={{ maxWidth: '1000px', margin: '4rem auto 0' }}>
//             <h3 style={{
//               fontSize: '0.875rem',
//               fontWeight: '600',
//               color: colors.textSecondary,
//               textTransform: 'uppercase',
//               letterSpacing: '0.05em',
//               marginBottom: '1.5rem'
//             }}>
//               Recent Queries
//             </h3>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
//               {history.map((item, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => {
//                     setQuery(item.query);
//                     executeQuery(item.query);
//                   }}
//                   style={{
//                     background: colors.background,
//                     border: `1px solid ${colors.borderLight}`,
//                     borderRadius: '8px',
//                     padding: '1.25rem 1.5rem',
//                     textAlign: 'left',
//                     cursor: 'pointer',
//                     transition: 'all 0.2s',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'space-between',
//                     gap: '1rem'
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.borderColor = colors.primary;
//                     e.currentTarget.style.background = '#FAFAFA';
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.borderColor = colors.borderLight;
//                     e.currentTarget.style.background = colors.background;
//                   }}
//                 >
//                   <span style={{ fontSize: '0.9375rem', color: colors.text, fontWeight: '400', flex: 1 }}>{item.query}</span>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
//                     <span style={{
//                       fontSize: '0.8125rem',
//                       color: colors.textSecondary,
//                       background: colors.backgroundSecondary,
//                       padding: '0.25rem 0.75rem',
//                       borderRadius: '6px',
//                       fontWeight: '500'
//                     }}>
//                       {item.recordCount} records
//                     </span>
//                     <ChevronRight size={16} color={colors.textSecondary} />
//                   </div>
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}
//       </main>

//       <style>{`
//         @keyframes spin {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
//       `}</style>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, BarChart3, PieChart, Activity, Clock, Database, CheckCircle, XCircle, Loader2, ChevronRight } from 'lucide-react';
import logo from "./logo.png";
import html2canvas from "html2canvas";


const API_BASE_URL = "https://e150d73573530.notebooks.jarvislabs.net/proxy/8000";

// Color scheme
const colors = {
  primary: 'rgb(150, 133, 117)',
  primaryHover: 'rgb(100, 89, 78)',
  background: 'rgb(255, 255, 255)',
  backgroundSecondary: 'rgb(244, 235, 226)',
  text: 'rgb(0, 0, 0)',
  textSecondary: 'rgb(51, 51, 51)',
  accent: 'rgb(150, 133, 117)',
  border: 'rgb(200, 178, 156)',
  borderLight: 'rgb(244, 235, 226)',
};

// Logo Component - Replace with your own logo
const HummingBirdLogo = ({ size = 200 }) => {
  return (
    <img 
      src={logo}
      alt="HummingBird Logo"
      style={{ width: "120px", height: "80px", objectFit: "contain" }}
    />
  );
};

  
  // OPTION 2: Use SVG from URL
  // return (
  //   <img 
  //     src="https://your-domain.com/logo.svg" 
  //     alt="HummingBird Logo" 
  //     style={{ width: `${size}px`, height: `${size}px`, objectFit: 'contain' }}
  //   />
  // );
  
  // OPTION 3: Default SVG logo (current)
  // return (
  //   <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
  //     <ellipse cx="50" cy="55" rx="18" ry="25" fill={colors.primary} opacity="0.9"/>
  //     <circle cx="50" cy="35" r="12" fill={colors.primary}/>
  //     <path d="M50 29 L50 18 L52 29 Z" fill={colors.primaryHover}/>
  //     <path d="M35 50 Q20 45 15 55 Q18 50 25 52 Q30 53 35 50 Z" 
  //           fill={colors.primary} opacity="0.7"/>
  //     <path d="M65 50 Q80 45 85 55 Q82 50 75 52 Q70 53 65 50 Z" 
  //           fill={colors.primary} opacity="0.7"/>
  //     <path d="M50 75 L45 90 L50 78 L55 90 Z" fill={colors.primary} opacity="0.8"/>
  //     <circle cx="48" cy="33" r="2" fill="white"/>
  //     <path d="M10 35 L25 35" stroke={colors.primary} strokeWidth="1.5" opacity="0.3"/>
  //     <path d="M12 42 L22 42" stroke={colors.primary} strokeWidth="1.5" opacity="0.3"/>
  //   </svg>
  // );
//};

export default function HummingBirdAnalytics() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [apiHealthy, setApiHealthy] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    checkApiHealth();
  }, []);

  const checkApiHealth = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/health`, { timeout: 5000 });
      setApiHealthy(response.ok);
    } catch (error) {
      setApiHealthy(false);
    }
  };

  const executeQuery = async (queryText) => {
    if (!queryText.trim()) return;
    
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryText }),
      });

      const data = await response.json();
      setResult(data);
      
      if (data.success) {
        setHistory(prev => [{
          query: queryText,
          timestamp: new Date().toISOString(),
          recordCount: data.raw_results?.length || 0
        }, ...prev].slice(0, 5));
      }
    } catch (error) {
      setResult({
        success: false,
        error: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const exampleQueries = [
    { icon: BarChart3, text: 'Show total number of bookings' },
    { icon: TrendingUp, text: 'What is the total revenue by city?' },
    { icon: PieChart, text: 'Show average rating by property' },
    { icon: Activity, text: 'Show booking trends by month' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFA', fontFamily: '"Cormorant Garamond", "Playfair Display", serif' }}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      
      {/* Header */}
      <header style={{
        background: colors.background,
        borderBottom: `1px solid ${colors.borderLight}`,
        padding: '1.25rem 0',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.95)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <HummingBirdLogo size={40} />
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: '600', color: colors.text, margin: 0, letterSpacing: '-0.01em' }}>
                HUMMINGBIRD
              </h1>
              <p style={{ fontSize: '0.75rem', color: colors.textSecondary, margin: 0, letterSpacing: '0.05em' }}>
                ANALYTICS
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <nav style={{ display: 'flex', gap: '2rem' }}>
              <a href="#" style={{ fontSize: '0.875rem', color: colors.textSecondary, textDecoration: 'none', fontWeight: '400', fontFamily: 'Inter, sans-serif' }}>Dashboard</a>
              <a href="#" style={{ fontSize: '0.875rem', color: colors.textSecondary, textDecoration: 'none', fontWeight: '400', fontFamily: 'Inter, sans-serif' }}>Reports</a>
              <a href="#" style={{ fontSize: '0.875rem', color: colors.textSecondary, textDecoration: 'none', fontWeight: '400', fontFamily: 'Inter, sans-serif' }}>Settings</a>
            </nav>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.875rem',
              color: apiHealthy ? '#2E7D32' : '#C62828'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: apiHealthy ? '#4CAF50' : '#F44336'
              }}></div>
              <span style={{ fontWeight: '500' }}>{apiHealthy ? 'Connected' : 'Offline'}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Black Bar */}
      <div style={{
        background: colors.text,
        padding: '1.25rem 0',
        borderBottom: `1px solid ${colors.border}`
      }}>
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto', 
          padding: '0 2rem',
          textAlign: 'center'
        }}>
          <p style={{
            fontSize: '0.9375rem',
            color: colors.background,
            margin: 0,
            fontFamily: 'Inter, sans-serif',
            fontWeight: '300',
            letterSpacing: '0.05em'
          }}>
            Automated business stay for corporate India
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '4rem 2rem' }}>
        
        {/* Search Section */}
        <div style={{ maxWidth: '800px', margin: '0 auto 4rem' }}>
          <h2 style={{
            fontSize: '2.75rem',
            fontWeight: '400',
            color: colors.text,
            textAlign: 'center',
            marginBottom: '0.75rem',
            letterSpacing: '0.01em',
            lineHeight: '1.2'
          }}>
            Ask anything about your data
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: colors.textSecondary,
            textAlign: 'center',
            marginBottom: '2.5rem',
            fontWeight: '300',
            fontFamily: 'Inter, sans-serif'
          }}>
            Natural language queries powered by AI
          </p>

          <div style={{ position: 'relative' }}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && executeQuery(query)}
              placeholder="e.g., Show total bookings by city"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '1.25rem 8rem 1.25rem 1.5rem',
                fontSize: '1rem',
                border: `1px solid ${colors.borderLight}`,
                borderRadius: '8px',
                outline: 'none',
                transition: 'all 0.2s',
                background: colors.background,
                boxSizing: 'border-box',
                fontWeight: '400'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = colors.primary;
                e.target.style.boxShadow = `0 0 0 3px ${colors.primary}15`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = colors.borderLight;
                e.target.style.boxShadow = 'none';
              }}
            />
            <button
              onClick={() => executeQuery(query)}
              disabled={isLoading || !query.trim()}
              style={{
                position: 'absolute',
                right: '0.5rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: colors.primary,
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '0.75rem 1.5rem',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                opacity: isLoading || !query.trim() ? 0.5 : 1,
                transition: 'all 0.2s',
                letterSpacing: '0.01em'
              }}
              onMouseEnter={(e) => {
                if (!isLoading && query.trim()) {
                  e.target.style.background = colors.primaryHover;
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.background = colors.primary;
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                  <span>Analyzing</span>
                </>
              ) : (
                <>
                  <Search size={16} />
                  <span>Analyze</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Example Queries */}
        {!result && (
          <div style={{ maxWidth: '1000px', margin: '0 auto 4rem' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1rem'
            }}>
              {exampleQueries.map((example, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuery(example.text);
                    executeQuery(example.text);
                  }}
                  style={{
                    background: colors.background,
                    border: `1px solid ${colors.borderLight}`,
                    borderRadius: '8px',
                    padding: '1.5rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = colors.borderLight;
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <example.icon size={24} color={colors.primary} strokeWidth={1.5} />
                  <span style={{ fontSize: '0.9375rem', color: colors.text, lineHeight: '1.5', fontWeight: '500' }}>
                    {example.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {result.success ? (
              <>
                {/* Answer */}
                <div style={{
                  background: colors.background,
                  borderRadius: '8px',
                  padding: '2.5rem',
                  marginBottom: '2rem',
                  border: `1px solid ${colors.borderLight}`
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '8px',
                      background: colors.backgroundSecondary,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <CheckCircle size={24} color={colors.primary} strokeWidth={2} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: colors.textSecondary, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Summary
                      </h3>
                      <div style={{ 
                        fontSize: '1rem', 
                        color: colors.text, 
                        lineHeight: '1.7', 
                        fontWeight: '400',
                        maxHeight: '400px',
                        overflowY: 'auto',
                        padding: '1rem',
                        background: '#FAFAFA',
                        borderRadius: '6px',
                        border: `1px solid ${colors.borderLight}`
                      }}>
                        {(() => {
                          const answerText = result.answer || result.response;
                          
                          // Parse and render markdown-style content
                          return answerText.split('\n').map((line, idx) => {
                            // Handle headers
                            if (line.startsWith('# ')) {
                              return <h4 key={idx} style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: colors.text }}>{line.replace('# ', '')}</h4>;
                            }
                            if (line.startsWith('## ')) {
                              return <h5 key={idx} style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem', color: colors.text }}>{line.replace('## ', '')}</h5>;
                            }
                            
                            // Handle bold text
                            if (line.includes('**')) {
                              const parts = line.split('**');
                              return (
                                <p key={idx} style={{ marginBottom: '0.75rem', fontSize: '0.9375rem' }}>
                                  {parts.map((part, i) => 
                                    i % 2 === 1 ? <strong key={i} style={{ fontWeight: '600' }}>{part}</strong> : part
                                  )}
                                </p>
                              );
                            }
                            
                            // Handle table rows
                            if (line.startsWith('|')) {
                              return null; // Tables will be handled by the data table below
                            }
                            
                            // Regular paragraphs
                            if (line.trim()) {
                              return <p key={idx} style={{ marginBottom: '0.75rem', fontSize: '0.9375rem' }}>{line}</p>;
                            }
                            
                            return <br key={idx} />;
                          });
                        })()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Data Table */}
                {result.raw_results && result.raw_results.length > 0 && (
                  <div style={{
                    background: colors.background,
                    borderRadius: '8px',
                    padding: '2.5rem',
                    marginBottom: '2rem',
                    border: `1px solid ${colors.borderLight}`
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                      <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: colors.text, margin: 0, letterSpacing: '-0.01em' }}>
                        Complete Data Results
                      </h3>
                      <span style={{
                        fontSize: '0.875rem',
                        color: colors.textSecondary,
                        background: colors.backgroundSecondary,
                        padding: '0.375rem 0.875rem',
                        borderRadius: '6px',
                        fontWeight: '500'
                      }}>
                        {result.raw_results.length} {result.raw_results.length === 1 ? 'record' : 'records'}
                      </span>
                    </div>
                    
                    <div style={{ 
                      overflowX: 'auto',
                      overflowY: 'auto',
                      maxHeight: '500px',
                      border: `1px solid ${colors.borderLight}`,
                      borderRadius: '6px'
                    }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9375rem' }}>
                        <thead style={{ 
                          position: 'sticky', 
                          top: 0, 
                          background: colors.background,
                          zIndex: 10,
                          boxShadow: `0 2px 4px rgba(0,0,0,0.05)`
                        }}>
                          <tr style={{ borderBottom: `2px solid ${colors.borderLight}` }}>
                            {Object.keys(result.raw_results[0]).map((key) => (
                              <th key={key} style={{
                                padding: '1rem',
                                textAlign: 'left',
                                fontWeight: '600',
                                color: colors.text,
                                fontSize: '0.875rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                background: colors.background,
                                whiteSpace: 'nowrap'
                              }}>
                                {key}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {result.raw_results.map((row, idx) => (
                            <tr key={idx} style={{
                              borderBottom: `1px solid ${colors.borderLight}`,
                              transition: 'background 0.15s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = '#FAFAFA'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                            >
                              {Object.values(row).map((value, vIdx) => (
                                <td key={vIdx} style={{
                                  padding: '1rem',
                                  color: colors.textSecondary,
                                  fontWeight: '400',
                                  whiteSpace: 'nowrap'
                                }}>
                                  {value !== null && value !== undefined ? String(value) : '-'}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    {result.raw_results.length > 10 && (
                      <p style={{
                        fontSize: '0.8125rem',
                        color: colors.textSecondary,
                        marginTop: '1rem',
                        textAlign: 'center',
                        fontStyle: 'italic'
                      }}>
                        Scroll to view all {result.raw_results.length} records
                      </p>
                    )}
                  </div>
                )}

                {/* Visualizations - Only show if charts exist */}
                {result.suggested_charts && result.suggested_charts.length > 0 && result.raw_results && result.raw_results.length > 0 && (
                  <div style={{
                    background: colors.background,
                    borderRadius: '8px',
                    padding: '2.5rem',
                    border: `1px solid ${colors.borderLight}`
                  }}>
                    <h3 style={{ 
                      fontSize: '0.875rem', 
                      fontWeight: '600', 
                      color: colors.textSecondary, 
                      marginBottom: '1.5rem', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.05em',
                      fontFamily: 'Inter, sans-serif'
                    }}>
                      Visualizations
                    </h3>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: result.suggested_charts.length === 1 ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))',
                      gap: '2rem'
                    }}>
                      {result.suggested_charts.map((chart, idx) => {
                        const chartData = result.raw_results;
                        const xCol = chart.x_column;
                        const yCol = chart.y_column;
                        
                        if (!xCol || !yCol || !chartData.length) return null;
                        
                        const maxValue = Math.max(...chartData.map(d => Number(d[yCol]) || 0));
                        
                        return (
                          <div key={idx} style={{
                            background: '#FAFAFA',
                            borderRadius: '8px',
                            padding: '1.5rem',
                            border: `1px solid ${colors.borderLight}`
                          }}>
                            <h4 style={{
                              fontSize: '1rem',
                              fontWeight: '500',
                              color: colors.text,
                              marginBottom: '1.5rem',
                              fontFamily: 'Cormorant Garamond, serif'
                            }}>
                              {chart.title || `${yCol} by ${xCol}`}
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                              {chartData.slice(0, 8).map((item, dataIdx) => {
                                const value = Number(item[yCol]) || 0;
                                const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
                                
                                return (
                                  <div key={dataIdx} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{
                                      minWidth: '120px',
                                      fontSize: '0.875rem',
                                      color: colors.text,
                                      fontFamily: 'Inter, sans-serif',
                                      fontWeight: '400'
                                    }}>
                                      {String(item[xCol]).substring(0, 20)}
                                    </div>
                                    <div style={{ flex: 1, position: 'relative', height: '32px', display: 'flex', alignItems: 'center' }}>
                                      <div style={{
                                        width: `${percentage}%`,
                                        height: '24px',
                                        background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.primaryHover} 100%)`,
                                        borderRadius: '4px',
                                        transition: 'width 0.5s ease',
                                        minWidth: '2px'
                                      }}></div>
                                    </div>
                                    <div style={{
                                      minWidth: '80px',
                                      fontSize: '0.875rem',
                                      color: colors.textSecondary,
                                      fontFamily: 'Inter, sans-serif',
                                      fontWeight: '500',
                                      textAlign: 'right'
                                    }}>
                                      {typeof value === 'number' ? value.toLocaleString() : value}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div style={{
                background: '#FFF5F5',
                borderRadius: '8px',
                padding: '2.5rem',
                border: '1px solid #FFCDD2',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1.5rem'
              }}>
                <XCircle size={24} color="#C62828" strokeWidth={2} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#C62828', margin: '0 0 0.5rem 0', letterSpacing: '-0.01em' }}>
                    Query Failed
                  </h3>
                  <p style={{ fontSize: '0.9375rem', color: '#B71C1C', margin: 0, lineHeight: '1.6' }}>
                    {result.error}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* History */}
        {history.length > 0 && (
          <div style={{ maxWidth: '1000px', margin: '4rem auto 0' }}>
            <h3 style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: colors.textSecondary,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '1.5rem'
            }}>
              Recent Queries
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {history.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuery(item.query);
                    executeQuery(item.query);
                  }}
                  style={{
                    background: colors.background,
                    border: `1px solid ${colors.borderLight}`,
                    borderRadius: '8px',
                    padding: '1.25rem 1.5rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.background = '#FAFAFA';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = colors.borderLight;
                    e.currentTarget.style.background = colors.background;
                  }}
                >
                  <span style={{ fontSize: '0.9375rem', color: colors.text, fontWeight: '400', flex: 1 }}>{item.query}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{
                      fontSize: '0.8125rem',
                      color: colors.textSecondary,
                      background: colors.backgroundSecondary,
                      padding: '0.25rem 0.75rem',
                      borderRadius: '6px',
                      fontWeight: '500'
                    }}>
                      {item.recordCount} records
                    </span>
                    <ChevronRight size={16} color={colors.textSecondary} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}