#!/usr/bin/perl

use DBI;
use strict;
use warnings;
use CGI;
#use CGI qw(:standard);
use JSON;
#use allow_nonref;

#print "Content-type: text/html\r\n\r\n";
#print header('application/json');
#print "\r\n\r\n";

my $cgi = CGI->new;
#print $cgi->header;
print $cgi->header(-type => "application/json", -charset => "utf-8");

my $driver   = "SQLite"; 
my $database = "db_appointment.db";
#my $dsn = "DBI:$driver:dbname = $database";
my $dsn = "DBI:$driver:$database";
my $userid = "";
my $password = "";
my $dbh = DBI->connect($dsn, $userid, $password, { RaiseError => 1 }) 
   or die $DBI::errstr;

#print "Opened database successfully\n";

my $stmt = qq(SELECT date, time, description from tab_appointment;);
my $sth = $dbh->prepare( $stmt );
my $rv = $sth->execute() or die $DBI::errstr;

my @data = ();

while (my $hashref = $sth->fetchrow_hashref())
{
    push(@data,$hashref);
}

my $json;
$json->{"entries"} = \@data;

my $json_text = to_json($json);
$dbh->disconnect();

#my $cgi = CGI->new;
#print $cgi->header(-type => "application/json", -charset => "utf-8");
#print $cgi->header;
#print header('application/json');
#print "Content-type: text/html\r\n\r\n";
#print "<html><head><title>Environment Dumper </title></head><body>";
#print "</body></html>";
#print "\r\n\r\n";
print $json_text;


#print "Operation done successfully\n";
#$dbh->disconnect();
