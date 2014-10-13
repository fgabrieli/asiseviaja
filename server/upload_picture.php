<pre>
<?php
print_r($_FILES);
function receive() {
	$fileReader = fopen('php://input', 'r');
	$fileWriter = fopen('images/test.jpg', 'w+');

	while(true) {
		$buffer = fgets($fileReader, 4096);
		if (strlen($buffer) == 0) {
			fclose($fileReader);
			fclose($fileWriter);
			return true;
		}

		fwrite($fileWriter, $buffer);
	}

	return false;
}

receive();
?>
</pre>
