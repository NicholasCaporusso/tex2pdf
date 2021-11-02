const latex=require('node-latex')
const fs=require('fs')
const commandExistsSync=require('command-exists').sync
const myArgs=process.argv.slice(2)
//console.log('myArgs: ',myArgs)
if(myArgs.length==0){
	console.log('Error: INPUTFILE is mising')
	console.log('Usage: render INPUTFILE [OUTPUTFILE]')
	process.exit()
}
if(!fs.existsSync(myArgs[0])){
	console.log(`Error: File ${myArgs[0]} does not exist`)
	process.exit()
}

const options=fs.existsSync('./config.json') ? JSON.parse(fs.readFileSync('config.json'),'utf8') : {}
if(options.cmd && options.cmd.length>0){
	if(!commandExistsSync(options.cmd)){
		console.log(`Error: PDFLaTeX (${options.cmd}) was not found. Install PDFLaTeX or specify path in config.json (Set cmd to PDFLaTeX path).`)
		process.exit()
	}
}else{
	if(!commandExistsSync('pdflatex')){
		console.log(`Error: PDFLaTeX was not found. Install PDFLaTeX or specify path in config.json (Set cmd to PDFLaTeX path)`)
		process.exit()
	}
}

const outputFilename=myArgs.length>1 && myArgs[1].length>0 ? myArgs[1] : myArgs[0].replace(/\.tex$/,'.pdf')
const input=fs.createReadStream(myArgs[0])
const output=fs.createWriteStream(outputFilename)
const pdf=latex(input,options)
 
pdf.pipe(output)
pdf.on('error',err=>console.error(err))
pdf.on('finish',()=>console.log(`PDF generated: ${outputFilename}`))
