#!/usr/bin/perl

use DBI;
use strict;

my $driver   = "SQLite"; 
my $database = "db_appointment.db";
#my $dsn = "DBI:$driver:dbname = $database";
my $dsn = "DBI:$driver:$database";
my $userid = "";
my $password = "";
my $dbh = DBI->connect($dsn, $userid, $password, { RaiseError => 1 }) 
   or die $DBI::errstr;

print "Opened database successfully\n";

#=for comment
my $stmt = qq(CREATE TABLE tab_appointment
   (date TEXT,
      time           TEXT,
      description    TEXT
      ););

my $rv = $dbh->do($stmt);

if($rv < 0) {
   print $DBI::errstr;
} else {
   print "Table created successfully\n";
}
#=cut

#=for comment
my $stmt = qq(INSERT INTO tab_appointment (date,time,description)
               VALUES ('May 2', '11:00am', 'Something'));
my $rv = $dbh->do($stmt) or die $DBI::errstr;

$stmt = qq(INSERT INTO tab_appointment (date,time,description)
               VALUES ('May 2', '12:00pm', 'Something else'));
$rv = $dbh->do($stmt) or die $DBI::errstr;

$stmt = qq(INSERT INTO tab_appointment (date,time,description)
               VALUES ('May 4', '8:00am', 'Meet foo'));

$rv = $dbh->do($stmt) or die $DBI::errstr;

$stmt = qq(INSERT INTO tab_appointment (date,time,description)
               VALUES ('June 2', '11:00am', 'CEO Meeting!'));

$rv = $dbh->do($stmt) or die $DBI::errstr;
print "Records created successfully\n";
#=cut

my $stmt = qq(SELECT date, time, description from tab_appointment;);
my $sth = $dbh->prepare( $stmt );
my $rv = $sth->execute() or die $DBI::errstr;

if($rv < 0) {
   print $DBI::errstr;
}

while(my @row = $sth->fetchrow_array()) {
      print "Date = ". $row[0] . "\n";
      print "Time = ". $row[1] ."\n";
      print "Description = ". $row[2] ."\n";
}
print "Operation done successfully\n";
$dbh->disconnect();
