File folder = new File("/Users/you/folder/");
File[] listOfFiles = folder.listFiles();

for (File file : listOfFiles) {
    if (file.isFile()) {
        System.out.println(file.getName());
    }
}