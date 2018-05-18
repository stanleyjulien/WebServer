#!/usr/bin/perl

use DBI;
use strict;
use warnings;
use CGI;
#use CGI qw(:standard);
use JSON;
#use HTML::Template;
#use allow_nonref;


#print "Content-type: text/html\r\n\r\n";
#print header('application/json');
#print "\r\n\r\n";

my $cgi = CGI->new;
print "Content-Type:text/html\r\n\r\n";

my $param = $cgi->{param};



my $driver   = "SQLite"; 
my $database = "db_appointment.db";
#my $dsn = "DBI:$driver:dbname = $database";
my $dsn = "DBI:$driver:$database";
my $userid = "";
my $password = "";
my $dbh = DBI->connect($dsn, $userid, $password, { RaiseError => 1 }) 
   or die $DBI::errstr;

#print "Opened database successfully\n";

my $d = $cgi->param("date");
my $t = $cgi->param("time");
my $desc = $cgi->param("description");
my @data = ($d, $t, $desc);

=for comment
print $d;
print "<bt />";
print $t;
print "<bt />";
print $desc;
=cut
=for comment
my $stmt = qq(insert into tab_appointment(date, time, description) values(?,?,?) );
my $sth = $dbh->prepare( $stmt );
my $rv = $sth->execute(@data) or die $DBI::errstr;
$sth->finish;
=cut

my $sth = $dbh->prepare('INSERT INTO tab_appointment (date, time, description) values (?, ?, ?)')  or die "Can't prepare Query: $DBI::errstr\n";

$sth->execute($d, $t, $desc) or die "Can't execute query: $DBI::errstr\n";

#my $template = HTML::Template->new(filename => 'homepage.html');
#print $template->output;
print "<META HTTP-EQUIV=refresh CONTENT=\"1;URL=http://localhost/homepage.html\">\n";
=for comment
print $d;
print "<bt />";
print $t;
print "<bt />";
print $desc;
=cut
#print $cgi->param("date");
foreach( keys(%{$param}) ){
  #print $_," -> ",$param->{$_};
  
  #print "<br/>";
}

