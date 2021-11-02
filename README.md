# tex2pdf - LaTeX to PDF converter

*Requires PDFlatex*, which can be downloaded and installed from https://miktex.org/

If you have the portable edition of PDFlatex, you can specify its path in the `config.json` file

```json
{
  "cmd":"PATH_TO_PDFLATEX"
}

```

### Usage
tex2pdf INPUTFILE [OUTPUTFILE]

- INPUTFILE (required): the path/name of the input file in tex format (.tex)
- OUTPUTFILE (optional): the path/name of the output file 