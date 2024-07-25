<?php
require_once('TCPDF-main/tcpdf.php');
require("./partial/db.php");

class MYPDF extends TCPDF {
    private $custom_auto_page_break;
    private $custom_bMargin;

    public function Header() {
        $this->custom_auto_page_break = $this->getAutoPageBreak();
        $this->custom_bMargin = $this->getBreakMargin();
        $this->SetAutoPageBreak(false, 0);
        $img_file = K_PATH_IMAGES.'back2.jpg';
        $this->Image($img_file, 0, 0, 210, 297, '', '', '', false, 300, '', false, false, 0);
        $this->SetAutoPageBreak($this->custom_auto_page_break, $this->custom_bMargin);
        $this->setPageMark();
    }
}

$pdf = new MYPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Nicola Asuni');
$pdf->SetTitle('TCPDF Example 051');
$pdf->SetSubject('TCPDF Tutorial');
$pdf->SetKeywords('TCPDF, PDF, example, test, guide');
$pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
$pdf->SetHeaderMargin(0);
$pdf->SetFooterMargin(0);
$pdf->setPrintFooter(false);
$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);
$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

if (@file_exists(dirname(__FILE__).'/lang/eng.php')) {
    require_once(dirname(__FILE__).'/lang/eng.php');
    $pdf->setLanguageArray($l);
}

$pdf->AddPage();
$html = '<span style="background-color:yellow;color:blue;">&nbsp;PAGE 2&nbsp;</span>';
$pdf->writeHTML($html, true, false, true, false, '');

// --- example with background set on page ---

// remove default header
$pdf->setPrintHeader(false);

// -- set new background ---

// get the current page break margin
$bMargin = $pdf->getBreakMargin();
// get current auto-page-break mode
$auto_page_break = $pdf->getAutoPageBreak();
// disable auto-page-break
$pdf->SetAutoPageBreak(false, 0);
// set bacground image
$img_file = K_PATH_IMAGES.'back1.jpg';
$pdf->Image($img_file, 0, 0, 210, 297, '', '', '', false, 300, '', false, false, 0);
// restore auto-page-break status
$pdf->SetAutoPageBreak($auto_page_break, $bMargin);
// set the starting point for the page content
$pdf->setPageMark();
$pdf->setPrintHeader(false);

// Set position for the date
$pdf->SetXY(0, 60); // Adjust the Y value as needed to place it at the top right corner
$pdf->SetFont('helvetica', '', 12);
$pdf->SetTextColor(0, 0, 0); // Red color for the date
$pdf->Cell(0, 0, 'Date: ' . date("d-m-Y"), 0, 2, 'R');
// require("../includes/db.php");
    $fire=new db();
    if(isset($_GET['id'])) {
    $id=$_GET['id'];
    // echo $id;
    $data=array('id'=>$id);
    $msg = $fire->performcurd('student','s',[],$data);
    // print_r($msg);

// Adding some space between the date and the content
$pdf->Ln(36); // Adds a 30mm vertical space, adjust as needed

// Content HTML
foreach($msg as $msg1){
$html = '
<style>
.content p {
    font-size: 14px;
    color: black;
    font-family: Arial, sans-serif; 
}
</style>
<div class="content">
    <p>This is to certify that <b>'.$msg1['name'].' -'.$msg1['enroll_no'].',</b> a student of <b>'.$msg1['university_name'].',</b> <b>'.$msg1['location'].',</b> will be undergoing an internship program at WebS Technology, Bhavnagar.</p>
    <p>He will be undertaking his internship in our <b>IT Development</b> Department. The internship will be for 15 days and shall commence from '.$msg1['date'].' at our location.</p>
    <p>During his tenure with us, we found him sincere and result-oriented.</p>
    <p>We wish him the best of luck in his career and future endeavors.</p>
    
</div>';}

// Write the HTML content
$pdf->writeHTML($html, true, false, true, false, '');

// Output the PDF
$pdf->Output('example_051.pdf', 'I');}
?>
