'use client'

import { useEffect, useState } from 'react'
import { CalendarDays, ChevronDown, CircleDollarSign, Download, FileCheck2, FileDown, FileText, Landmark, LoaderCircle, Pencil, Scale, ShieldCheck, Upload, Users, WalletCards } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CountUp } from '@/components/dashboard/count-up'
import { PDF_ACCENTS, PDF_COLORS, drawFooters, drawPageHeader, drawSectionTitle, fill, hexToRgb, ink, sanitizePdfText, stroke, tint, type Rgb } from '@/lib/pdf-theme'

type Step = { id:string; title:string; action:string; activity:string; actors:string; date:string; icon:typeof Landmark }
const phases:{title:string; subtitle:string; color:string; steps:Step[]}[]=[
 {title:'Phase 1 · Préparation',subtitle:'Construire et consolider le projet de budget',color:'#2563eb',steps:[
  {id:'cadrage',title:'Cadrage budgétaire',action:'Orienter',date:'2026-01-15',icon:Landmark,activity:'Établissement des orientations gouvernementales, des priorités nationales, des hypothèses macroéconomiques ainsi que des limites budgétaires estimées.',actors:'Président de la République · Premier Ministre · Membres du Gouvernement · Ministre du Budget · Ministre des Finances · Ministère du Plan · Banque Centrale du Congo · Régies financières · Services techniques'},
  {id:'avant-projets',title:'Élaboration des avant-projets',action:'Planifier',date:'2026-03-01',icon:FileCheck2,activity:'Chaque secteur définit ses besoins financiers annuels ainsi que les programmes, actions et projets d’investissement nécessaires.',actors:'Ministères sectoriels · Institutions publiques · Administrations centrales · Responsables de programmes · Cellules budgétaires · Directions des études et de la planification'},
  {id:'conferences',title:'Conférences budgétaires',action:'Examiner',date:'2026-05-15',icon:Users,activity:'Analyse approfondie des propositions soumises, justification des besoins exprimés, comparaison avec les limites budgétaires et préparation des décisions à prendre.',actors:'Ministère du Budget · Ministère des Finances · Ministère du Plan · Ministères sectoriels · Experts techniques · Régies financières'},
  {id:'arbitrages',title:'Arbitrages gouvernementaux',action:'Arbitrer',date:'2026-07-15',icon:Scale,activity:'Établissement d’une hiérarchie dans les dépenses, révision des crédits et confirmation de l’équilibre global entre recettes, dépenses et financement.',actors:'Premier Ministre · Conseil des ministres · Ministre du Budget · Ministre des Finances · Ministres sectoriels · Services techniques du Gouvernement'},
  {id:'adoption',title:'Adoption de l’avant-projet',action:'Valider',date:'2026-09-01',icon:FileCheck2,activity:'Validation du projet de loi de finances avant son envoi au Parlement.',actors:'Conseil des ministres · Premier Ministre · Ministre du Budget · Ministre des Finances · Secrétariat général du Gouvernement'}]},
 {title:'Phase 2 · Autorisation',subtitle:'Donner au budget sa force légale',color:'#7c3aed',steps:[
  {id:'parlement',title:'Examen parlementaire',action:'Débattre & voter',date:'2026-09-15',icon:Users,activity:'Analyse, discussions, auditions, modifications et vote concernant la loi de finances.',actors:'Assemblée nationale · Sénat · Commissions Écofin et Budget · Parlementaires · Ministre du Budget · Ministre des Finances · Experts parlementaires'},
  {id:'promulgation',title:'Promulgation',action:'Officialiser',date:'2026-12-31',icon:FileCheck2,activity:'Officialisation de la loi de finances, marquant ainsi son entrée en application.',actors:'Président de la République · Premier Ministre · Ministre du Budget · Ministre des Finances · Journal officiel'}]},
 {title:'Phase 3 · Exécution',subtitle:'Mobiliser les ressources et exécuter les crédits',color:'#d97706',steps:[
  {id:'credits',title:'Mise à disposition des crédits',action:'Allouer',date:'2027-01-05',icon:WalletCards,activity:'Distribution des crédits approuvés, communication des dotations et planification de leur utilisation.',actors:'Ministère du Budget · Direction générale du Budget · Ministère des Finances · Direction générale du Trésor et de la Comptabilité publique · Responsables sectoriels'},
  {id:'recettes',title:'Mobilisation des recettes',action:'Recouvrer',date:'2027-01-10',icon:CircleDollarSign,activity:'Validation, recouvrement et regroupement des recettes publiques.',actors:'Ministère des Finances · Direction Générale des Impôts · Direction Générale des Douanes et Accises · Direction Générale des Recettes Administratives et Domaniales · Trésor public · Banque Centrale du Congo'},
  {id:'depenses',title:'Exécution des dépenses',action:'Exécuter',date:'2027-01-15',icon:WalletCards,activity:'Engagement, liquidation, ordonnancement, paiement et comptabilisation des dépenses qui ont été approuvées.',actors:'Ordonnateurs · Gestionnaires de crédits · Contrôleurs budgétaires · Direction générale du Budget · Trésor public · Comptables publics · Banque Centrale du Congo'}]},
 {title:'Phase 4 · Pilotage & contrôle',subtitle:'Mesurer, ajuster et rendre compte',color:'#059669',steps:[
  {id:'suivi',title:'Suivi et régulation',action:'Piloter',date:'2027-03-31',icon:ShieldCheck,activity:'Suivi des taux d’exécution, analyse des écarts, ajustement des crédits et surveillance de la trésorerie.',actors:'Ministère du Budget · Ministère des Finances · Trésor public · Services de contrôle budgétaire · Ministères sectoriels · Structures de suivi'},
  {id:'controle',title:'Contrôle et reddition des comptes',action:'Évaluer',date:'2028-03-31',icon:Scale,activity:'Vérification de la conformité, évaluation des performances, élaboration des états financiers et analyse de la loi de règlement.',actors:'Inspection générale des finances · Cour des comptes · Parlement · Ministère du Budget · Ministère des Finances · Agents comptables · Responsables d’ordonnancement · Entités d’audit'}]},
]
const chain=[
 ['01','Engagement',"L’ordonnateur établit ou reconnaît l’obligation de débourser des fonds, après avoir confirmé la disponibilité du crédit.",'Ministère du Budget'],
 ['02','Liquidation','Les services concernés examinent la véracité de la prestation fournie et déterminent le montant précis à régler.','Ministère du Budget'],
 ['03','Ordonnancement','L’ordonnateur donne l’instruction de procéder au paiement en faveur du créancier.','Ministère des Finances'],
 ['04','Paiement','Le comptable public ou le Trésor procède à l’exécution du règlement.','Ministère des Finances'],
]
const defaultEndDates:Record<string,string>={cadrage:'2026-02-15','avant-projets':'2026-04-30',conferences:'2026-06-30',arbitrages:'2026-08-15',adoption:'2026-09-14',parlement:'2026-12-15',promulgation:'2026-12-31',credits:'2027-01-31',recettes:'2027-12-31',depenses:'2027-12-31',suivi:'2027-12-31',controle:'2028-03-31'}
type Schedule={start:string;end:string}
type StepFile={id:string;stepId:string;name:string;type:string;size:number;blob:Blob}

function openFilesDb():Promise<IDBDatabase>{return new Promise((resolve,reject)=>{const request=indexedDB.open('fiscality-budget-files',1);request.onupgradeneeded=()=>{const store=request.result.createObjectStore('files',{keyPath:'id'});store.createIndex('stepId','stepId')};request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error)})}
async function readStepFiles(){const db=await openFilesDb();return new Promise<StepFile[]>((resolve,reject)=>{const request=db.transaction('files','readonly').objectStore('files').getAll();request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error)})}
async function saveStepFile(file:StepFile){const db=await openFilesDb();return new Promise<void>((resolve,reject)=>{const request=db.transaction('files','readwrite').objectStore('files').put(file);request.onsuccess=()=>resolve();request.onerror=()=>reject(request.error)})}
const simplifiedProcess=[
 'Identification des priorités du gouvernement.',
 'Définition du cadre macroéconomique et budgétaire.',
 'Envoi des directives budgétaires.',
 'Rédaction des projets préliminaires par les ministères.',
 'Prise de décisions et consolidation des propositions.',
 'Validation lors du Conseil des ministres.',
 'Analyse et vote par les membres du Parlement.',
 'Publication de la loi de finances.',
 'Mise en œuvre des recettes et des dépenses.',
 'Surveillance, contrôle et présentation des comptes.',
]
const all=phases.flatMap(p=>p.steps)

export function BudgetProcessView(){
 const [schedules,setSchedules]=useState<Record<string,Schedule>>({}); const [files,setFiles]=useState<StepFile[]>([]); const [open,setOpen]=useState('cadrage'); const [exporting,setExporting]=useState(false)
 useEffect(()=>{try{
  // Restaure une préférence externe après l'hydratation du composant client.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  setSchedules(JSON.parse(localStorage.getItem('fiscality-budget-schedules')||'{}'))
  readStepFiles().then(setFiles).catch(()=>undefined)
 }catch{}},[])
 const getSchedule=(step:Step):Schedule=>schedules[step.id]||{start:step.date,end:defaultEndDates[step.id]||step.date}
 const change=(step:Step,field:keyof Schedule,value:string)=>{const next={...schedules,[step.id]:{...getSchedule(step),[field]:value}};setSchedules(next);localStorage.setItem('fiscality-budget-schedules',JSON.stringify(next))}
 const uploadFiles=async(stepId:string,list:FileList|null)=>{if(!list)return;const additions:StepFile[]=[];for(const file of Array.from(list)){const entry={id:`${stepId}-${crypto.randomUUID()}`,stepId,name:file.name,type:file.type,size:file.size,blob:file};await saveStepFile(entry);additions.push(entry)}setFiles(current=>[...current,...additions])}
 const downloadFile=(file:StepFile)=>{const url=URL.createObjectURL(file.blob);const link=document.createElement('a');link.href=url;link.download=file.name;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
 const selectStep=(id:string)=>{
  setOpen(id)
  window.requestAnimationFrame(()=>{
   const element=document.getElementById(id)
   element?.scrollIntoView({behavior:'smooth',block:'center'})
   element?.focus({preventScroll:true})
  })
 }
 const exportPdf=async()=>{
  setExporting(true)
  try{
   const {jsPDF}=await import('jspdf')
   const pdf=new jsPDF({unit:'mm',format:'a4'})
   const pageWidth=pdf.internal.pageSize.getWidth(); const pageHeight=pdf.internal.pageSize.getHeight(); const margin=16; const contentWidth=pageWidth-margin*2
   let y=drawPageHeader(pdf,{title:'Processus budgétaire',subtitle:'Du cadrage budgétaire à la reddition des comptes'})
   const ensure=(height:number)=>{if(y+height>pageHeight-18){pdf.addPage();y=drawPageHeader(pdf,{title:'Processus budgétaire',compact:true})}}
   // Chiffres clés.
   const stats:[string,string,Rgb][]=[[String(phases.length),'phases',PDF_ACCENTS[0]],[String(all.length),'étapes',PDF_ACCENTS[3]],[String(chain.length),'étapes de la dépense',PDF_ACCENTS[1]]]
   const statWidth=(contentWidth-8)/3
   stats.forEach(([value,label,color],i)=>{const x=margin+i*(statWidth+4);fill(pdf,tint(color,0.9));pdf.roundedRect(x,y,statWidth,15,2.5,2.5,'F');fill(pdf,color);pdf.roundedRect(x,y,1.6,15,0.8,0.8,'F');ink(pdf,color);pdf.setFont('helvetica','bold');pdf.setFontSize(16);pdf.text(value,x+6,y+10.3);const valueWidth=pdf.getTextWidth(value);pdf.setFontSize(7.5);ink(pdf,PDF_COLORS.text);pdf.text(label.toUpperCase(),x+8+valueWidth,y+9.6)})
   y+=22
   const introduction=pdf.splitTextToSize("Le processus budgétaire se déroule selon un schéma organisé, depuis la phase de préparation jusqu'à la présentation des résultats. À chaque étape, divers acteurs institutionnels et techniques sont impliqués pour garantir la planification, l'approbation, la mise en œuvre et la surveillance du budget de l'État.",contentWidth-10) as string[]
   fill(pdf,PDF_COLORS.zebra);pdf.roundedRect(margin,y,contentWidth,introduction.length*4.2+7,2,2,'F');pdf.setFont('helvetica','italic');pdf.setFontSize(9);ink(pdf,PDF_COLORS.text);pdf.text(introduction,margin+5,y+6);y+=introduction.length*4.2+15
   y=drawSectionTitle(pdf,y,'Phases de la procédure')
   phases.forEach((phase,phaseIndex)=>{
    const color=hexToRgb(phase.color)
    ensure(22)
    fill(pdf,color);pdf.roundedRect(margin,y,contentWidth,14,2.5,2.5,'F')
    fill(pdf,PDF_COLORS.white);pdf.circle(margin+8,y+7,4.2,'F');ink(pdf,color);pdf.setFont('helvetica','bold');pdf.setFontSize(10);pdf.text(String(phaseIndex+1),margin+8,y+8.4,{align:'center'})
    ink(pdf,PDF_COLORS.white);pdf.setFontSize(11);pdf.text(phase.title.toUpperCase(),margin+16,y+6.2);pdf.setFont('helvetica','normal');pdf.setFontSize(8);pdf.text(phase.subtitle,margin+16,y+10.8)
    pdf.setFont('helvetica','bold');pdf.setFontSize(7.5);pdf.text(`${phase.steps.length} ÉTAPE${phase.steps.length>1?'S':''}`,pageWidth-margin-5,y+8.4,{align:'right'})
    y+=19
    phase.steps.forEach((step)=>{
     pdf.setFont('helvetica','normal');pdf.setFontSize(8.5)
     const activity=pdf.splitTextToSize(step.activity,contentWidth-14) as string[]
     pdf.setFontSize(8)
     const actors=pdf.splitTextToSize(step.actors,contentWidth-14) as string[]
     // Hauteur complète : en-tête, titre, deux libellés, lignes de contenu et marges.
     // Cette réserve empêche notamment les longues listes d'intervenants de sortir du cadre.
     const blockHeight=33+activity.length*4.2+actors.length*3.9
     ensure(blockHeight+4)
     fill(pdf,PDF_COLORS.white);stroke(pdf,tint(color,0.7));pdf.setLineWidth(0.3);pdf.roundedRect(margin,y,contentWidth,blockHeight,2.5,2.5,'FD')
     fill(pdf,color);pdf.roundedRect(margin,y,2.2,blockHeight,1.1,1.1,'F')
     ink(pdf,color);pdf.setFont('helvetica','bold');pdf.setFontSize(7.5);pdf.text(`ÉTAPE ${all.indexOf(step)+1} · ${step.action.toUpperCase()}`,margin+7,y+6.5)
     ink(pdf,PDF_COLORS.ink);pdf.setFontSize(12);pdf.text(step.title,margin+7,y+12.5)
     const schedule=getSchedule(step)
     const startDate=new Date(`${schedule.start}T00:00:00`).toLocaleDateString('fr-FR',{day:'2-digit',month:'short',year:'numeric'})
     const endDate=new Date(`${schedule.end}T00:00:00`).toLocaleDateString('fr-FR',{day:'2-digit',month:'short',year:'numeric'})
     const dateLabel=sanitizePdfText(`${startDate}  »  ${endDate}`)
     pdf.setFontSize(7.5);const dateWidth=pdf.getTextWidth(dateLabel)+8
     fill(pdf,tint(color,0.88));pdf.roundedRect(pageWidth-margin-4-dateWidth,y+4,dateWidth,6.5,3.2,3.2,'F');ink(pdf,color);pdf.text(dateLabel,pageWidth-margin-4-dateWidth/2,y+8.4,{align:'center'})
     let lineY=y+19.5
     pdf.setFont('helvetica','bold');pdf.setFontSize(7);ink(pdf,PDF_COLORS.muted);pdf.text('ACTIVITÉ PRINCIPALE',margin+7,lineY);lineY+=4.2
     pdf.setFont('helvetica','normal');pdf.setFontSize(8.5);ink(pdf,PDF_COLORS.text);pdf.text(activity,margin+7,lineY);lineY+=activity.length*4.2+2.5
     fill(pdf,tint(color,0.94));pdf.roundedRect(margin+5,lineY-3.8,contentWidth-9,actors.length*3.9+6.5,1.5,1.5,'F')
     pdf.setFont('helvetica','bold');pdf.setFontSize(7);ink(pdf,color);pdf.text('INTERVENANTS',margin+7,lineY);lineY+=4
     pdf.setFont('helvetica','normal');pdf.setFontSize(8);ink(pdf,PDF_COLORS.text);pdf.text(actors,margin+7,lineY)
     y+=blockHeight+4
    })
    y+=3
   })
   ensure(40);y+=2
   fill(pdf,PDF_COLORS.navy);pdf.roundedRect(margin,y,contentWidth,19,2.5,2.5,'F');fill(pdf,PDF_COLORS.yellow);pdf.roundedRect(margin,y,contentWidth,1.2,0.6,0.6,'F')
   ink(pdf,PDF_COLORS.white);pdf.setFont('helvetica','bold');pdf.setFontSize(12);pdf.text('PROCESSUS DE LA DÉPENSE PUBLIQUE',margin+5,y+8);pdf.setFont('helvetica','normal');pdf.setFontSize(8);ink(pdf,[191,219,254]);pdf.text('Quatre étapes consécutives : engagement, liquidation, ordonnancement et paiement.',margin+5,y+14);y+=25
   chain.forEach(([number,title,description,owner])=>{
    const color:Rgb=owner.includes('Budget')?PDF_ACCENTS[0]:PDF_ACCENTS[3]
    pdf.setFont('helvetica','normal');pdf.setFontSize(8.5)
    const lines=pdf.splitTextToSize(description,contentWidth-22) as string[];const height=Math.max(20,13+lines.length*4.2);ensure(height+3)
    fill(pdf,tint(color,0.93));stroke(pdf,tint(color,0.7));pdf.setLineWidth(0.3);pdf.roundedRect(margin,y,contentWidth,height,2.5,2.5,'FD')
    fill(pdf,color);pdf.circle(margin+8,y+8,4.5,'F');ink(pdf,PDF_COLORS.white);pdf.setFont('helvetica','bold');pdf.setFontSize(8.5);pdf.text(number,margin+8,y+9.3,{align:'center'})
    ink(pdf,PDF_COLORS.ink);pdf.setFontSize(11);pdf.text(title,margin+16,y+7)
    const ownerLabel=owner.toUpperCase();pdf.setFontSize(6.5);const ownerWidth=pdf.getTextWidth(ownerLabel)+7
    fill(pdf,color);pdf.roundedRect(pageWidth-margin-4-ownerWidth,y+3,ownerWidth,5.5,2.7,2.7,'F');ink(pdf,PDF_COLORS.white);pdf.text(ownerLabel,pageWidth-margin-4-ownerWidth/2,y+6.7,{align:'center'})
    pdf.setFont('helvetica','normal');pdf.setFontSize(8.5);ink(pdf,PDF_COLORS.text);pdf.text(lines,margin+16,y+12.5);y+=height+3
   })
   const green:Rgb=[5,150,105]
   ensure(30);y+=5
   y=drawSectionTitle(pdf,y,'Processus simplifié',green)
   simplifiedProcess.forEach((item,index)=>{
    pdf.setFont('helvetica','normal');pdf.setFontSize(9)
    const lines=pdf.splitTextToSize(item,contentWidth-16) as string[];const height=Math.max(9,lines.length*4.2+4.5);ensure(height)
    fill(pdf,index%2===0?tint(green,0.93):PDF_COLORS.white);pdf.roundedRect(margin,y,contentWidth,height,1.5,1.5,'F')
    fill(pdf,green);pdf.circle(margin+5,y+height/2,3,'F');ink(pdf,PDF_COLORS.white);pdf.setFont('helvetica','bold');pdf.setFontSize(7);pdf.text(String(index+1),margin+5,y+height/2+1.1,{align:'center'})
    ink(pdf,PDF_COLORS.text);pdf.setFont('helvetica','normal');pdf.setFontSize(9);pdf.text(lines,margin+11,y+height/2+1.3-(lines.length-1)*2.1);y+=height
   })
   drawFooters(pdf,'Processus budgétaire · Ministère du Budget · République Démocratique du Congo')
   pdf.save(`processus-budgetaire-${new Date().toISOString().slice(0,10)}.pdf`)
  }finally{setExporting(false)}
 }
 return <div className="space-y-5 pb-8">
  <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 px-5 py-6 text-white shadow-lg md:px-8"><div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl"/><div className="relative flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><div><div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[.18em]"><Landmark className="h-3.5 w-3.5 text-blue-200"/> Ressources</div><h2 className="text-2xl font-black tracking-tight md:text-3xl">Cycle du processus budgétaire</h2><p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-blue-100/80">De la définition des priorités nationales à la reddition des comptes : une lecture institutionnelle, chronologique et opérationnelle du budget de l’État.</p></div><div className="flex flex-wrap items-stretch gap-2"><button type="button" onClick={exportPdf} disabled={exporting} className="inline-flex min-h-16 items-center gap-2 rounded-xl bg-blue-500 px-4 text-[12px] font-bold text-white shadow-sm transition-colors hover:bg-blue-400 disabled:opacity-60">{exporting?<LoaderCircle className="h-4 w-4 animate-spin"/>:<Download className="h-4 w-4"/>}{exporting?'Génération…':'Télécharger le PDF'}</button><div className="rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-center backdrop-blur"><p className="text-2xl font-black text-blue-200"><CountUp value="4" /></p><p className="text-[10px] uppercase tracking-wider text-blue-100/70">phases</p></div><div className="rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-center backdrop-blur"><p className="text-2xl font-black"><CountUp value={String(all.length)} /></p><p className="text-[10px] uppercase tracking-wider text-blue-100/70">étapes</p></div></div></div></section>
  <nav className="overflow-x-auto rounded-xl border border-border bg-card p-4"><div className="flex min-w-max items-start">{all.map((s,i)=>{const p=phases.find(x=>x.steps.includes(s))!;const selected=open===s.id;return <div key={s.id} className="flex items-start"><button onClick={()=>selectStep(s.id)} aria-current={selected?'step':undefined} className={cn('group flex w-24 flex-col items-center gap-2 rounded-lg py-1 transition-colors',selected&&'bg-accent')}><span style={{borderColor:p.color,color:selected?'white':p.color,backgroundColor:selected?p.color:undefined}} className="flex h-8 w-8 items-center justify-center rounded-full border-2 bg-card text-[10px] font-black transition-transform group-hover:scale-110">{String(i+1).padStart(2,'0')}</span><span className={cn('text-center text-[9px] font-semibold text-muted-foreground',selected&&'text-foreground')}>{s.action}</span></button>{i<all.length-1&&<span className="mt-4 h-px w-4 bg-border"/>}</div>})}</div></nav>
  {phases.map((p,pi)=><section key={p.title} className="overflow-hidden rounded-2xl border border-border bg-card"><header className="flex items-center gap-4 border-b border-border px-5 py-4" style={{background:`linear-gradient(90deg,${p.color}18,transparent)`}}><span style={{backgroundColor:p.color}} className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-black text-white">{pi+1}</span><div><h3 className="text-sm font-black uppercase tracking-[.08em]">{p.title}</h3><p className="text-[11px] text-muted-foreground">{p.subtitle}</p></div></header><div className="p-3 md:p-5">{p.steps.map((s,i)=>{const Icon=s.icon,expanded=open===s.id,schedule=getSchedule(s),stepFiles=files.filter(file=>file.stepId===s.id);return <div key={s.id} id={s.id} tabIndex={-1} className="flex scroll-mt-6 gap-3 rounded-xl outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-primary/50 md:gap-5"><div className="flex w-10 shrink-0 flex-col items-center"><span style={{backgroundColor:p.color}} className="z-10 flex h-10 w-10 items-center justify-center rounded-xl text-white"><Icon className="h-4 w-4"/></span>{i<p.steps.length-1&&<span style={{backgroundColor:`${p.color}55`}} className="min-h-8 w-px flex-1"/>}</div><article className={cn('mb-3 min-w-0 flex-1 rounded-xl border transition-all',expanded?'border-primary/50 bg-accent/30 shadow-md ring-1 ring-primary/20':'border-border')}><button className="flex w-full flex-col gap-3 p-4 text-left sm:flex-row sm:items-center sm:justify-between" onClick={()=>setOpen(expanded?'':s.id)}><div><span className="text-[9px] font-bold uppercase tracking-[.16em]" style={{color:p.color}}>Étape {all.indexOf(s)+1}</span><h4 className="text-[14px] font-bold">{s.title}</h4></div><div className="flex items-center gap-2"><CalendarDays className="h-3.5 w-3.5 text-muted-foreground"/><span className="text-[10px] font-semibold text-foreground">{new Date(`${schedule.start}T00:00:00`).toLocaleDateString('fr-FR')} – {new Date(`${schedule.end}T00:00:00`).toLocaleDateString('fr-FR')}</span><Pencil className="h-3 w-3 text-muted-foreground"/><ChevronDown className={cn('h-4 w-4 transition-transform',expanded&&'rotate-180')}/></div></button>{expanded&&<div className="grid gap-4 border-t border-border px-4 py-4 md:grid-cols-5"><div className="md:col-span-3"><p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Activité principale</p><p className="mt-1 text-[12px] leading-relaxed">{s.activity}</p></div><div className="md:col-span-2"><p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Intervenants</p><p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{s.actors}</p></div><div className="rounded-lg border border-border bg-background/70 p-3 md:col-span-5"><div className="flex flex-wrap items-end gap-3"><label className="min-w-40 flex-1"><span className="mb-1 block text-[9px] font-bold uppercase text-muted-foreground">Date de début</span><input type="date" value={schedule.start} max={schedule.end} onChange={e=>change(s,'start',e.target.value)} className="w-full rounded-md border border-border bg-background px-2.5 py-2 text-[11px] outline-none focus:border-primary"/></label><label className="min-w-40 flex-1"><span className="mb-1 block text-[9px] font-bold uppercase text-muted-foreground">Date de fin</span><input type="date" value={schedule.end} min={schedule.start} onChange={e=>change(s,'end',e.target.value)} className="w-full rounded-md border border-border bg-background px-2.5 py-2 text-[11px] outline-none focus:border-primary"/></label></div></div><div className="rounded-lg border border-border bg-background/70 p-3 md:col-span-5"><div className="flex flex-wrap items-center justify-between gap-2"><div><p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Pièces jointes</p><p className="text-[10px] text-muted-foreground">{stepFiles.length} fichier{stepFiles.length!==1?'s':''}</p></div><label className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-primary px-3 py-2 text-[11px] font-bold text-primary-foreground hover:bg-primary/90"><Upload className="h-3.5 w-3.5"/>Ajouter des fichiers<input type="file" multiple className="sr-only" onChange={e=>{void uploadFiles(s.id,e.target.files);e.target.value=''}}/></label></div>{stepFiles.length>0&&<div className="mt-3 grid gap-2 sm:grid-cols-2">{stepFiles.map(file=><div key={file.id} className="flex min-w-0 items-center gap-2 rounded-md border border-border bg-card p-2"><FileText className="h-4 w-4 shrink-0 text-primary"/><div className="min-w-0 flex-1"><p className="truncate text-[11px] font-semibold">{file.name}</p><p className="text-[9px] text-muted-foreground">{(file.size/1024).toLocaleString('fr-FR',{maximumFractionDigits:1})} Ko</p></div><button type="button" onClick={()=>downloadFile(file)} title={`Télécharger ${file.name}`} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-primary hover:bg-accent"><FileDown className="h-4 w-4"/></button></div>)}</div>}</div></div>}</article></div>})}</div></section>)}
  <section className="overflow-hidden rounded-2xl border border-border bg-card"><header className="border-b border-border bg-foreground px-6 py-5 text-background"><p className="text-[9px] font-bold uppercase tracking-[.2em] opacity-60">Zoom opérationnel</p><h3 className="mt-1 text-lg font-black">La chaîne de la dépense publique</h3><p className="mt-1 text-[11px] opacity-70">Engagement et liquidation relèvent du Ministère du Budget ; ordonnancement et paiement relèvent du Ministère des Finances.</p></header><div className="grid p-5 md:grid-cols-4 md:p-6">{chain.map(([n,t,d,owner],i)=><div key={t} className="relative flex gap-3 pb-6 md:block md:pb-0 md:pr-7"><span className="z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-black text-primary-foreground">{n}</span>{i<3&&<span className="absolute left-[18px] top-9 h-[calc(100%-36px)] w-px bg-border md:left-9 md:top-[18px] md:h-px md:w-[calc(100%-36px)]"/>}<div className="md:pt-3"><p className="text-[13px] font-bold">{t}</p><p className="mt-1 inline-flex rounded-full bg-primary/10 px-2 py-1 text-[9px] font-bold text-primary">{owner}</p><p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">{d}</p></div></div>)}</div></section>
 </div>
}
