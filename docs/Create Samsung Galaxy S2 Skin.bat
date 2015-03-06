Do the following to create the Samsung Galaxy S2 skin:

Download the skin from the Samsung page (follow the link posted by anshumans)

Go to directory [Android-SDK directory]/platforms/android-10/skins

Create a new directory named GALAXY_S2

Extract all files from the downloaded ZIP file to the new directory

Edit the file manifest.ini and change the line api=9 to api=10

Start the AVD and click "New..."

Under Target select "Android 2.3.3 - API Level 10"

Under Skin choose "GALAXY_S2" from the dropdown list

Click "Create AVD"